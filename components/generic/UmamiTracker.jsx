import React from "react";

export default async function UmamiTracker() {
    return (
        <script
            defer src="https://umami.dev.hav-g.in/script.js"
            data-website-id="5f55e752-9b42-4a0f-b664-fb92a77353e6"
            data-before-send="beforeSendHandler">
        </script>
    )
}

function beforeSendHandler(type, payload) {
    // todo: if local storage contains case id then payload.id = caseId
    console.log("TRACKER PLOAD", type, payload);
    return payload;
}