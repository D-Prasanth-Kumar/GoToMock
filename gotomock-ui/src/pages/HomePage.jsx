import Navbar from "../components/Navbar";
import HeroSection from "../components/sections/HeroSection";
import InterviewTracksSection from "../components/sections/InterviewTracksSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import AIInterviewSection from "../components/sections/AIInterviewSection";
import StudyHubSection from "../components/sections/StudyHubSection";
import FAQSection from "../components/sections/FAQSection";
import Footer from "../components/Footer";
import PageWrapper from "../components/PageWrapper";

function HomePage() {
    return (
        <>
        
            <PageWrapper>

                <Navbar />

                <HeroSection />

                <InterviewTracksSection />

                <FeaturesSection />

                <AIInterviewSection />

                <StudyHubSection />

                <FAQSection />

                <Footer />

            </PageWrapper>

        </>
    );
}

export default HomePage;