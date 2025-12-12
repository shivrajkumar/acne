"use client"

import { isEmpty } from "lodash";

export default function UmamiTracker() {
    return (
        <script
            defer
            src="https://d3twoz8hvcdm9h.cloudfront.net/scripts/umami/script.js"
            data-website-id="612391cc-ff23-40c2-a67b-f42856abbbe6"
            data-host-url="https://umami.dev.hav-g.in/">
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

export const identifyUmamiUser = async (traits = {}) => {
    if (isEmpty(traits)) {
        return;
    }

    if (typeof window !== "undefined" && window.umami) {
        try {
            const { email, phone_number } = traits;
            let { case_id } = traits;

            if (!case_id) {
                case_id = window.localStorage.getItem("caseId");
            }

            await window.umami.identify({
                caseId: case_id,
                email,
                phone_number
            });
        } catch (e) {
            console.error("Umami identify error:", e);
        }
    }
};
