import { useRef } from "react";
import BackgroundVideo from "../../shared/components/BackgroundVideo";
import HeroSection from "../components/HeroSection";
import FlexCard from "../components/FlexCard";
import { growBusinessData, presentationData } from "../types/data.mapper";
import PresentationCard from "../components/PresentationCard";
import MileStone from "../components/MileStone";

export default function WelcomePage() {
    const scrollToRef = useRef(null);

    const scrollToElement = () => {
        if (scrollToRef.current) {
            scrollToRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <BackgroundVideo />

            <div className="container">
                <HeroSection scrollToElement={scrollToElement} />
                <FlexCard scrollToRef={scrollToRef} />

                {presentationData.map((data, index) => (
                    <PresentationCard key={index} data={data} />
                ))}
            </div>
            <MileStone />
            <div className="container">
                <PresentationCard data={growBusinessData} />
            </div>
        </>
    )
}