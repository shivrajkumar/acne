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
            <div className="md:relative sticky top-0 z-50">
                <AcneMarqueeBanner />
                <AcneHeader />
            </div>
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