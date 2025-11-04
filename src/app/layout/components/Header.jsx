import { Button, Card, Menu, UnstyledButton } from "@mantine/core";
import GameInLogo from "../../../assets/homepage/gamein-logo.svg";
import { HeaderSection } from "../../../shared/styles/layouts";
import routePaths from "../../router/routes";
import { Link, useNavigate } from "react-router";
import AvatarSection from "../../../shared/components/AvatarSection";
import coverImage from "../../../assets/creators/creator_image.jpg";
import profileMediaUrlsHelper from "../../../shared/utils/helpers/useProfileMediaUrl.helper";
import { persistor, store } from "../../store";
import { useAppDispatch } from "../../store/hooks";
import { clearUser } from "../../../features/auth/store/userSlice";
import { logout } from "../../../features/auth/store/authSlice";
import { performLogout } from "../../../features/auth/store/logoutThunk";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";


const Header = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedInUser = store.getState().auth.accessToken ? true : false;
    const { avatarUrl } = profileMediaUrlsHelper(store.getState().user?.profile || {});
    // console.log(store.getState().user?.profile);
    
    const handleLogout = () => {
        dispatch(performLogout()).finally(() => {
            navigate(routePaths.LOGIN);
            showNotificationHelper("Logged out successfully", "You have been logged out successfully", NOTIFICATION_TYPES.SUCCESS);
        });
    };


    const navList = [
        {
            label: "GameIn",
            path: routePaths.WELCOMEPAGE,
        },
        {
            label: "About",
            path: routePaths.WELCOMEPAGE,
        },
        {
            label: "Info",
            path: routePaths.WELCOMEPAGE,
        },
        {
            label: "Guidelines",
            path: routePaths.WELCOMEPAGE,
        },
    ];



    return (
        <HeaderSection>
            <Card className="headerCard" radius={0}>
                <div className="container-fluid">
                    <div className="headerFlex">
                        <div className="logo">
                            <Link to={routePaths.WELCOMEPAGE}>
                                <img src={GameInLogo} alt="GameIn Logo" />
                            </Link>
                        </div>

                        <nav>
                            {!isLoggedInUser ? (
                                <ul>
                                    {navList.map((item, index) => (
                                        <li key={index}>
                                            <Link to={item.path}>{item.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (

                                <Menu shadow="md" width={180} position="bottom-end">
                                    <Menu.Target>
                                        <UnstyledButton>
                                            <AvatarSection
                                                className="avatar-icon-small"
                                                size="55"
                                                avatar={avatarUrl || coverImage}
                                            />
                                        </UnstyledButton>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Label style={{ fontSize: "1em" }}>
                                            Hello,{" "}
                                            {store.getState().user?.profile?.username?.charAt(0).toUpperCase() + store.getState().user?.profile?.username?.slice(1).toLowerCase() || ""}
                                        </Menu.Label>
                                        <Menu.Item onClick={() => navigate(routePaths.ACCOUNTS.PROFILE.ROOT || "" || store.getState().user?.profile?.username)}>
                                            Profile
                                        </Menu.Item>
                                        <Menu.Item onClick={() => navigate(routePaths.ACCOUNTS.DASHBOARD.ROOT)}>
                                            Dashboard
                                        </Menu.Item>    
                                        <Menu.Divider />
                                        <Menu.Item color="red" onClick={handleLogout}>
                                            Logout
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            )}

                            {!isLoggedInUser && (
                                <div className="access-btns">
                                    <Link to={routePaths.LOGIN}>
                                        <Button
                                            variant="grey"
                                            size="sm"
                                            style={{ marginRight: "0.5em" }}
                                        >
                                            Sign in
                                        </Button>
                                    </Link>
                                    <Link to={routePaths.REGISTER}>
                                        <Button variant="secondary" size="sm">
                                            Register
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            </Card>
        </HeaderSection>
    )
}

export default Header;
