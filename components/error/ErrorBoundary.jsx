"use client"

import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        window.location.href = "https://bp-vayu.dev.hav-g.in";
        console.error("Error:", error);
        console.error("Error Info:", errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <></>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

