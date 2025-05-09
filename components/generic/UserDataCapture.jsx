'use client';

import { useEffect, useState } from 'react';
import { trackMoEngageEvent } from '@/utils/moegage';

export default function UserDataCapture() {
    const [locationDetails, setLocationDetails] = useState(null);



    useEffect(() => {

        fetchLocationData();
        const urlParams = new URLSearchParams(window.location.search);
        const utmParams = {
            utm_source: urlParams.get('utm_source'),
            utm_medium: urlParams.get('utm_medium'),
            utm_campaign: urlParams.get('utm_campaign'),
            utm_term: urlParams.get('utm_term'),
            utm_content: urlParams.get('utm_content')
        };

        trackMoEngageEvent("UserDeviceInfoCaptured", {
            platform: "web",
            device_os: window.navigator.platform,
            browser_type: window.navigator.userAgent,
            screen_resolution: `${window.screen.width}x${window.screen.height}`,
        });
        trackMoEngageEvent("UtmSourceCaptured", {
            utm_source: utmParams?.utm_source,
            utm_medium: utmParams?.utm_medium,
            utm_campaign: utmParams?.utm_campaign,
            utm_term: utmParams?.utm_term,
            utm_content: utmParams?.utm_content,
        });
    }, []);


    useEffect(() => {
        if (locationDetails) {
            trackMoEngageEvent("UserInfoCaptured", {
                region: locationDetails?.region ?? "",
                IP_Location: locationDetails.ip,
            });
        }
    }, [locationDetails])

    const fetchLocationData = () => {
        const addressDetailsUrl1 = "https://ipapi.co/json/";
        const addressDetailsUrl2 = "http://ip-api.com/json/";

        fetch(addressDetailsUrl1)
            .then((res) => {
                if (res.status === 429 || res.status !== 200) {
                    return fetch(addressDetailsUrl2);
                } else if (!res.ok) {
                    throw new Error("Failed to fetch address details");
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                if (data.json) {
                    return data.json();
                }
                return data;
            })
            .then((data) => {
                setLocationDetails(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    return null;
}

