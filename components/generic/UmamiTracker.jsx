"use client"
import { useEffect } from 'react';

export default function UmamiTracker() {
    useEffect(() => {
        if (typeof window !== undefined) {
            window.beforeSendHandler = function (type, payload) {
                const caseId = window.localStorage.getItem('caseId');
                if (caseId) {
                    payload.id = caseId;
                }

                console.log('beforeSendHandler', payload);
                return payload;
            };
        }
    }, []);

    return (
        <script
            defer
            src="https://umami.dev.hav-g.in/script.js"
            data-website-id="5f55e752-9b42-4a0f-b664-fb92a77353e6"
            data-before-send="beforeSendHandler">
        </script>
    );
}
