'use client'
import deleteKeysFromLocalStorage from "@/helpers/localstorage";
import { getFbExternalId } from "@/helpers/metaCapiHelper";
import { useEffect } from "react";

const GTMpagelandingEvent = ({ event }) => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: event })
        }

    }, [event])
    return (null);
}

export function logGtmEvent(event, attributes) {
    try {
        window.dataLayer = window.dataLayer || [];
        const fbData = getFbExternalId();
        if (!attributes.fb_external_id && fbData) attributes = { ...attributes, ...fbData};
        window.dataLayer.push({
            event,
            ...attributes,
        });
    } catch (error) {
        console.info(error.toString());
    }
}

export function clearGtmFlags(keysToDelete) {
    // Example usage
    deleteKeysFromLocalStorage(keysToDelete);

    // return null
}
export default GTMpagelandingEvent;