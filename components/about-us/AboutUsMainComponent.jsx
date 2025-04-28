import AboutUsBanner from "./AboutUsBanner";
import InfoSection from "./InfoSection";
import SkinCareCarousel from "./SkinCareCarousel";
import WaveMarquee from "./WaveMarquee";
import SkincareMakeSenseAboutUs from "./SkincareMakeSenseAboutUs";
import AcneMarqueeBanner from "../generic/AcneMarqueeBanner";
import AcneHeader from "../generic/AcneHeader";
import AcneFooter from "../generic/AcneFooter";

const AboutUsMainComponent = () => {

    return (
        <>
            <AcneMarqueeBanner />
            <AcneHeader />
            <AboutUsBanner />
            <WaveMarquee />
            <InfoSection />
            <SkinCareCarousel />
            <SkincareMakeSenseAboutUs />
            <AcneFooter />
        </>
    )
}
export default AboutUsMainComponent;