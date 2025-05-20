
import { NavLink } from "react-router";
import GameInLogo from "../assets/homepage/gamein-logo.svg";
import { Button, Card } from "@mantine/core";
import { HeaderSection } from "../styles/layouts";

export default function Header() {
  return (
    <HeaderSection>
      <Card className="headerCard">
        <div className="container-fluid">
          <div className="headerFlex">
            <div className="logo">
              <img src={GameInLogo} alt="GameIn Logo" />
            </div>
            <nav>
              <ul>
                <li><NavLink to="/">GameIn</NavLink></li>
                <li><NavLink to="/">About</NavLink></li>
                <li><NavLink to="/">Info</NavLink></li>
                <li><NavLink to="/">GuideLines</NavLink></li>
              </ul>
              <div className="access-btns">
                <Button variant="grey" padding="0.5rem" size="sm" width="6.25rem">
                  Sign in
                </Button>
                <Button variant="secondary" padding="0.5rem" size="sm" width="6.25rem">
                  Register
                </Button>
              </div>
            </nav>
          </div>
        </div>
    </Card>
  </HeaderSection>
  )
}
