import { Hero } from "@/components/LandingPage/Hero";
import { HowItWorks } from "@/components/LandingPage/HowItWork";
import Pricing2 from "@/components/LandingPage/Subscription";
import { Testimonials } from "@/components/LandingPage/Testomonial";
import Style from "@/components/shared/landingPageStyle";

const page = () => {
    return (
        <div>
            <Style/>
            <header>
               
                <main className="">
                    <Hero />
                    <HowItWorks />
                    <Pricing2 />
                    <Testimonials/>
                </main>
            </header>
        </div>
    );
};

export default page;