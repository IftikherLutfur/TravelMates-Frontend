import { Hero } from "@/components/LandingPage/Hero";
import { HowItWorks } from "@/components/LandingPage/HowItWork";
import { SubscriptionTiers } from "@/components/LandingPage/Subscription";
import { Testimonials } from "@/components/LandingPage/Testomonial";
import { Footer } from "@/components/shared/Footer";
import Style from "@/components/shared/landingPageStyle";
import Navbar from "@/components/shared/Navbar";

const page = () => {
    return (
        <div>
            <Style/>
            <header>
                <Navbar />
                <main className="">
                    <Hero />
                    <HowItWorks />
                    <SubscriptionTiers />
                    <Testimonials/>
                </main>
            </header>
            <Footer />
        </div>
    );
};

export default page;