'use client';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { getSearchParams } from '@helpers/getSearchParams'
import { getValidJSONFromString } from '@constants/urls'


const COOKIES_EXPIRY = 60; // Cookie expiration time in days

// List of UTM keys to track
const UTM_KEYS = ['utm_campaign', 'utm_source', 'utm_medium', 'utm_content', 'utm_term', 'adset', 'adname'];

export const UTMManager = () => {
    const searchParams = useSearchParams();
    useEffect(() => {
        try {
            if (searchParams) {
                const parsedParams = getSearchParams(searchParams);
                const filteredParams = UTM_KEYS.reduce((acc, key) => {
                    if (parsedParams[key]) {
                        acc[key] = parsedParams[key];
                    }
                    return acc;
                }, {});
                const existingCookie = Cookies.get('__CLEAR_RITUAL_UTM__');
                const existingParams = getValidJSONFromString(existingCookie);
                const hasChanged = UTM_KEYS.some(key => filteredParams[key] !== existingParams[key]);

                if (hasChanged) {
                    const updatedParams = {
                        ...existingParams,
                        ...filteredParams,
                    };

                    Cookies.set('__CLEAR_RITUAL_UTM__', JSON.stringify(updatedParams), {
                        expires: COOKIES_EXPIRY, secure: true,
                        sameSite: 'strict'
                    });
                }
            }

        } catch (error) {
            console.error(error);
        }
    }, [searchParams]);

    return <></>;
};
