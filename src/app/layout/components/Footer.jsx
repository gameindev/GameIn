import { Card, TextInput, Title } from "@mantine/core";
import { FooterSection } from "../../../shared/styles/layouts";
import { Link } from "react-router";
import GameInLogo from "../../../assets/homepage/gamein-logo.svg";
import routePaths from "../../router/routes";

const footerLinks = [
  {
    title: "GameIn",
    to: routePaths.FOOTER.ROOT,
    links: ["Competency", "Service", "Vision", "Mission"],
  },
  {
    title: "About",
    to: routePaths.FOOTER.ABOUT,
    links: [
      "Team",
      "Location",
      "History",
      "Jobs",
      "Contact",
      "Press",
      "Imprint",
      "Thanks to..",
    ],
  },
  {
    title: "Info",
    to: routePaths.FOOTER.INFO,
    links: ["Cooperation", "Support", "FAQ", "Feedback", "Devs"],
  },
  {
    title: "Terms of Use",
    to: routePaths.FOOTER.TERMS,
    links: [
      "Guideliness",
      "Privacy Policy",
      "License Agreement",
      "Damage Limitation Clause",
      "50% Performance Bonus",
    ],
  },
];

const Footer = () => { 
    return (
        <Card p={0}>
            <FooterSection>
                <div className="container">
                    <div className="footerFlex">
                        <div className="choose-lang">
                            <Link className="logo" to={routePaths.WELCOMEPAGE} aria-label="GameIn home">
                                <img src={GameInLogo} alt="Game Logo" />
                            </Link>
                            <TextInput
                                component="select"
                                aria-label="Select language"
                                // rightSection={<IconChevronDown size={14} stroke={1.5} />}
                                pointer
                            >
                                <option value="1">Language</option>
                            </TextInput>
                        </div>
                        <nav className="quick-links" aria-label="Footer navigation">
                            {footerLinks.map((section) => (
                                <div className="gameIn-links" key={section.title}>
                                    <Title c="primary" fw="500" order={5}>{section.title}</Title>
                                    <ul>
                                        {section.links.map((label) => (
                                            <li key={label}>
                                                <Link to={section.to}>{label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </nav>
                        <div className="copyrights">
                            <Title c="primary" fw="500" order={5} ta="right">&#169; {new Date().getFullYear()}</Title>
                            <Title fw="500" order={5} ta="right">Esports network <br /> holdings</Title>
                            <h6></h6>
                        </div>
                    </div>
                </div>
            </FooterSection>
        </Card>
    )
}

export default Footer;
