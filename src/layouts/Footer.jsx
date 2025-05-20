import GameInLogo from "../assets/homepage/gamein-logo.svg";
import { Link } from 'react-router';
import { FooterSection } from "../styles/layouts";
import { Card, TextInput, Title } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export default function Footer() {
    return (
        <Card p={0}>
            <FooterSection>
                <div className="container">
                    <div className="footerFlex">
                        <div className="choose-lang">
                            <div className="logo">
                                <img src={GameInLogo} alt="Game Logo" />
                            </div>
                            <TextInput
                                component="select"
                                rightSection={<IconChevronDown size={14} stroke={1.5} />}
                                pointer
                                mt="md"
                            >
                                <option value="1">Language</option>
                            </TextInput>
                        </div>
                        <div className="quick-links">
                            <div className="gameIn-links">
                                <Title c="primary" fw="500" order={5}>GameIn</Title>
                                <ul>
                                    <li><Link>Competency</Link></li>
                                    <li><Link>Service</Link></li>
                                    <li><Link>Vision</Link></li>
                                    <li><Link>Mission</Link></li>
                                </ul>
                            </div>
                            <div className="gameIn-links">
                                <Title c="primary" fw="500" order={5}>About</Title>
                                <ul>
                                    <li><Link>Team</Link></li>
                                    <li><Link>Location</Link></li>
                                    <li><Link>History</Link></li>
                                    <li><Link>Jobs</Link></li>
                                    <li><Link>Contact</Link></li>
                                    <li><Link>Press</Link></li>
                                    <li><Link>Imprint</Link></li>
                                    <li><Link>Thanks to..</Link></li>
                                </ul>
                            </div>
                            <div className="gameIn-links">
                                <Title c="primary" fw="500" order={5}>Info</Title>
                                <ul>
                                    <li><Link>Cooperation</Link></li>
                                    <li><Link>Support</Link></li>
                                    <li><Link>FAQ</Link></li>
                                    <li><Link>Feedback</Link></li>
                                    <li><Link>Devs</Link></li>
                                </ul>
                            </div>
                            <div className="gameIn-links">
                                <Title c="primary" fw="500" order={5}>Terms of Use</Title>
                                <ul>
                                    <li><Link>Guideliness</Link></li>
                                    <li><Link>Privacy Policy</Link></li>
                                    <li><Link>License Agreement</Link></li>
                                    <li><Link>Damage Limitation Clause</Link></li>
                                    <li><Link>50% Performance Bonus</Link></li>
                                </ul>
                            </div>
                        </div>
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
