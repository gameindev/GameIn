import { Button } from "@mantine/core";
import StartYourJourney from "../../assets/homepage/start-your-journey.svg";
import { MileStoneStyles } from "../../styles/pages/welcomPage";
import { Link } from "react-router";
import CounterOnView from "./../shared/ui/CounterOnView";

export default function MileStone() {
  return (
    <MileStoneStyles>
      <div className="milestone_banner">
        <div className="milestone_container">
          <div className="startJourney">
            <img src={StartYourJourney} alt="" />
            <h3>Start your journey now!</h3>
            <p>
              evaluating the performances of amateur, semi-professional, and pro
            </p>
          </div>
          <div className="counts_block">
            <div className="games counter">
              <CounterOnView value={200} />
              <span>Games</span>
            </div>
            <div className="sponsors counter">
              <CounterOnView value={2.52} />
              {/* <div className="count">2.520</div> */}
              <span>Sponsors</span>
            </div>
            <div className="gamers counter">
              <CounterOnView value={15.31} />
              {/* <div className="count">15.310</div> */}
              <span>Gamers</span>
            </div>
            <div className="deals counter">
              <CounterOnView value={37.3} />
              {/* <div className="count">37.300</div> */}
              <span>Deals Made</span>
            </div>
          </div>
          <Link to="/register">
            <Button
              variant="secondary"
              size="lg"
              padding="1em"
              width="11.625em"
            >
              Register
            </Button>
          </Link>
        </div>
      </div>
    </MileStoneStyles>
  );
}
