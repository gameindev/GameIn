import { FooterSection } from '../components/styles/';
import GameInLogo from "../assets/homepage/gamein-logo.svg";
import { Link } from 'react-router';

export default function Footer() {
    return (
        <FooterSection>
            <div className="container">
                <div className="footerFlex">
                    <div className="choose-lang">
                        <div className="logo">
                            <img src={GameInLogo} alt="Game Logo" />
                        </div>
                        <div className="form-select">
                            <select name="" id="">
                                <option value="">Language</option>
                            </select>
                        </div>
                    </div>
                    <div className="quick-links">
                        <div className="gameIn-links">
                            <h5 className='color-primary'>GameIn</h5>
                            <ul>
                                <li><Link>Competency</Link></li>
                                <li><Link>Service</Link></li>
                                <li><Link>Vision</Link></li>
                                <li><Link>Mission</Link></li>
                            </ul>
                        </div>
                        <div className="gameIn-links">
                            <h5 className='color-primary'>About</h5>
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
                            <h5 className='color-primary'>Info</h5>
                            <ul>
                                <li><Link>Cooperation</Link></li>
                                <li><Link>Support</Link></li>
                                <li><Link>FAQ</Link></li>
                                <li><Link>Feedback</Link></li>
                                <li><Link>Devs</Link></li>
                            </ul>
                        </div>
                        <div className="gameIn-links">
                            <h5 className='color-primary'>Terms of Use</h5>
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
                        <h6 className='color-primary'>&#169; 2024</h6>
                        <h6>Esports network <br /> holdings</h6>
                    </div>
                </div>
            </div>
        </FooterSection>
    )
}
