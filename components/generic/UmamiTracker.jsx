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

                return payload;
            };
        }
    }, []);

    return (
        <script
            defer
            src="https://umami.dev.hav-g.in/script.js"
            data-website-id="612391cc-ff23-40c2-a67b-f42856abbbe6"
            data-before-send="beforeSendHandler">
        </script>
    );
}

export const trackUmamiEvent = async (eventName, attributes) => {
    if (window && window.umami) {
        try {
            await window.umami.track(eventName, attributes);
        } catch (e) {
            console.error('Umami event error:', {
                message: e.message,
                stack: e.stack,
            });
        }
    }
};
