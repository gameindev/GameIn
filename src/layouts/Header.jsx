import { Link, Navigate, NavLink } from "react-router";
import GameInLogo from "../assets/homepage/gamein-logo.svg";
import { Button, Card, Text } from "@mantine/core";
import { HeaderSection } from "../styles/layouts";
import { useSelector } from "react-redux";
import { isLoggedIn, selectCurrentUser } from "../stores/user/user.selector";
import { logoutUser } from "../stores/user/user.action";
import { useDispatch } from "react-redux";
import { persistor } from "../stores/store";

export default function Header() {
    const dispatch = useDispatch();

    const user = useSelector(selectCurrentUser);
    const isLoggedInUser = useSelector(isLoggedIn);

    const handleLogout = async () => {
        dispatch(logoutUser());
        await persistor.purge();
        Navigate("/");
    }

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
                                {isLoggedInUser ? (
                                    <>
                                        <Text>
                                            <span>Hello, {user?.username?.charAt(0).toUpperCase() + user?.username?.slice(1).toLowerCase()}</span>
                                        </Text>
                                        <Button
                                            variant="grey"
                                            padding="0.5rem"
                                            size="sm"
                                            width="6.25rem"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login">
                                            <Button
                                                variant="grey"
                                                padding="0.5rem"
                                                size="sm"
                                                width="6.25rem"
                                            >
                                                Sign in
                                            </Button>
                                        </Link>
                                        <Link to="/register">
                                            <Button
                                                variant="secondary"
                                                padding="0.5rem"
                                                size="sm"
                                                width="6.25rem"
                                            >
                                                Register
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                </div>
            </Card>
        </HeaderSection>
    );
}
