import { Button, Card, Menu, UnstyledButton, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React, { useState } from "react";
import GameInLogo from "../../../assets/homepage/gamein-logo.svg";
import { HeaderSection } from "../../../shared/styles/layouts";
import routePaths from "../../router/routes";
import { Link, useNavigate } from "react-router";
import AvatarSection from "../../../shared/components/AvatarSection";
import profileMediaUrlsHelper from "../../../shared/utils/helpers/useProfileMediaUrl.helper";
import { persistor, store } from "../../store";
import { useAppDispatch } from "../../store/hooks";
import { clearUser } from "../../../features/auth/store/userSlice";
import { logout } from "../../../features/auth/store/authSlice";
import { performLogout } from "../../../features/auth/store/logoutThunk";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";
import NotificationDropdown from "../../../features/notifications/components/NotificationDropdown";


const Header = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedInUser = store.getState().auth.accessToken ? true : false;
    const profile = store.getState().user?.profile || {};
    const { avatarUrl } = profileMediaUrlsHelper(profile);
    const profileDetails =
        profile?.creator_profile ||
        profile?.brand_profile ||
        profile?.community_profile;
    const avatarDisplayName =
        profileDetails?.first_name || profileDetails?.last_name
            ? `${profileDetails?.first_name || ""} ${profileDetails?.last_name || ""}`.trim()
            : profileDetails?.brand_name || profile?.username || "";
    // console.log(store.getState().user?.profile);

    const handleLogout = () => {
        dispatch(performLogout()).finally(() => {
            navigate(routePaths.LOGIN);
            showNotificationHelper("Logged out successfully", "You have been logged out successfully", NOTIFICATION_TYPES.SUCCESS);
        });
    };

    const [searchInput, setSearchInput] = useState("");

    const triggerSearchAll = () => {
        const q = (searchInput || "").trim();
        const path = routePaths.SEARCH.replace(":userType", "all");
        navigate(q ? `${path}?q=${encodeURIComponent(q)}` : path);
    };


    const navList = [
        {
            label: "GameIn",
            path: routePaths.WELCOMEPAGE,
        },
        {
            label: "New Home",
            path: routePaths.HOME_ALT,
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
        <HeaderSection $isLoggedIn={isLoggedInUser}>
            <Card className="headerCard" radius={0}>
                <div className="container-fluid">
                    <div className="headerFlex">
                        <div className="logo">
                            <Link to={routePaths.WELCOMEPAGE}>
                                <img src={GameInLogo} alt="GameIn Logo" />
                            </Link>
                        </div>

                        {isLoggedInUser && (
                            <div className="searchbar" style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 1em' }}>
                                <TextInput
                                    placeholder="Search..."
                                    variant="inputBgColor"
                                    radius="md"
                                    size="sm"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.currentTarget.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') triggerSearchAll(); }}
                                    rightSection={<IconSearch size={16} onClick={triggerSearchAll} style={{ cursor: 'pointer' }} />}
                                    style={{ minWidth: 250, maxWidth: 300, width: '100%' }}
                                />
                            </div>
                        )}

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
                                <>
                                    {/* Notification Dropdown */}
                                    <NotificationDropdown />
                                    
                                    <Menu shadow="md" width={180} position="bottom-end">
                                        <Menu.Target>
                                            <UnstyledButton>
                                                <AvatarSection
                                                    className="avatar-icon-small"
                                                    size="55"
                                                    avatar={avatarUrl}
                                                    displayName={avatarDisplayName}
                                                    firstName={profileDetails?.first_name}
                                                    lastName={profileDetails?.last_name}
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
                                </>
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
