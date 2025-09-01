import { CDN_BASE_URL } from "@/constants/constants";
import Head from "next/head";

const RecommendedCartHeader = () => {
    return (
        <>
            <Head>
                <title>Reorder Kit – Traya</title>
                <meta name="title" content="Result repeat" />
                <meta
                    name="description"
                    content="Wondering how to stop hair loss? At Traya Health, we use the approach of Ayurveda, Dermatology and Nutrition to provide doctor Recommended hair fall solutions. Find the root cause of your hair loss now."
                />
                <meta property="og:site_name" content="Traya Health" />
                <meta
                    property="og:url"
                    content={typeof window !== "undefined" && window.location.href}
                />
                <meta property="og:title" content="Result repeat" />
                <meta name="twitter:title" content="Result repeat" />
                <meta
                    name="twitter:description"
                    content="Wondering how to stop hair loss? At Traya Health, we use the approach of Ayurveda, Dermatology and Nutrition to provide doctor Recommended hair fall solutions. Find the root cause of your hair loss now."
                />
                <meta
                    property="og:description"
                    content="Wondering how to stop hair loss? At Traya Health, we use the approach of Ayurveda, Dermatology and Nutrition to provide doctor Recommended hair fall solutions. Find the root cause of your hair loss now."
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:image"
                    content={`${CDN_BASE_URL}website_images/localImages/traya_logo.webp`}
                />
                <meta
                    property="og:image:secure_url"
                    content={`${CDN_BASE_URL}website_images/localImages/traya_logo.webp`}
                />
                <meta property="og:image:width" content="603" />
                <meta property="og:image:height" content="189" />
                <meta name="twitter:card" content="summary_large_image" />

                <meta
                    name="twitter:image"
                    content={`${CDN_BASE_URL}website_images/localImages/traya_logo.webp`}
                ></meta>
            </Head>
        </>
    );
};

export default RecommendedCartHeader;
