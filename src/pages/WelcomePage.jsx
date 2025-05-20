import { useRef } from "react";
import { FlexCard, HeroSection, PresentationCard } from "../components/welcomePage";


export default function WelcomePage() {
  const scrollToRef = useRef(null);

  const scrollToElement = () => {
    scrollToRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
        <div className="container">
            <HeroSection scrollToElement={scrollToElement} />
            <FlexCard scrollToRef={scrollToRef} />
            <PresentationCard />
        </div>
    </>
  )
}
