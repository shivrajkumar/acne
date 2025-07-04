"use client"
import LoginPage from "@/components/login/Login";
import { AuthProvider } from "@/context/AuthContext";
import { Suspense } from "react";

export default function page({ searchParams }) {
    return (
        <>
            <Suspense>
                <AuthProvider>
                    <LoginPage searchParams={searchParams} />

                </AuthProvider>
            </Suspense>
        </>
    );
}
