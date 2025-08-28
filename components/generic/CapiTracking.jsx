'use client';
import { getCookieValue } from '@/helpers/cookieHelper';
import { metaCapi } from '@/helpers/metaCapiHelper';
import { useEffect } from 'react';

function CapiPageTracking({ payload, eventName }) {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cachedEmail = localStorage.getItem('user_email');
            const cachedPhone = localStorage.getItem('user_phone');
            const cachedGender = localStorage.getItem('gender');
            const cachedName = localStorage.getItem('user_name');

            const email = payload?.email || cachedEmail || null;
            const phone = payload?.phone || cachedPhone || null;
            const gender = payload?.gender || cachedGender || null;
            const name = payload?.name || cachedName || null;
            const cookies = document.cookie.split(';');

            let capiPayload = {
                fbc: getCookieValue("_fbc", cookies),
                fbp: getCookieValue("_fbp", cookies),
                url: window.location.href,
                path: window.location.pathname
            };
            //Needed for debugging purpose. Will remove in Productions
            console.log("Capi Tracking Rendered with event:", window.location.pathname);


            metaCapi({ ...capiPayload, email, phone, gender, name }, 'PageView');
        }
    }, [payload, eventName]);

    return null;
}


export default CapiPageTracking;