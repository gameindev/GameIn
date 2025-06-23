import { Link, useNavigate } from "react-router";
import GameInLogo from "../assets/homepage/gamein-logo.svg";
import { Button, Card, Text, Menu, UnstyledButton } from "@mantine/core";
import { HeaderSection } from "../styles/layouts";
import { useSelector, useDispatch } from "react-redux";
import { persistor } from "../stores/store";
import { isLoggedIn, currentUser } from "../stores/selectors";
import routePaths from "../routes/endpoints";
import coverImage from "../assets/creators/creator_image.jpg";
import AvatarSection from './../components/shared/ui/AvatarSection';
import { logoutUser } from "../stores/slices/auth";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(currentUser);
  const isLoggedInUser = useSelector(isLoggedIn);

  const handleLogout = async () => {
    dispatch(logoutUser());
    await persistor.purge();
    navigate(routePaths.LOGIN);
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
    }
  ]

  return (
    <HeaderSection>
      <Card className="headerCard" radius={0}>
        <div className="container-fluid">
          <div className="headerFlex">
            <div className="logo">
              <img src={GameInLogo} alt="GameIn Logo" />
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
                        size="3.5em"
                        avatar={coverImage}
                      />
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label style={{fontSize: "1em"}}>
                      Hello,{" "}
                      {user?.user?.username?.charAt(0).toUpperCase() +
                        user?.user?.username?.slice(1).toLowerCase()}
                    </Menu.Label>
                    <Menu.Item onClick={() => navigate("/profile")}>
                      Profile
                    </Menu.Item>
                    <Menu.Item onClick={() => navigate("/dashboard")}>
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
                  <Link to="/login">
                    <Button
                      variant="grey"
                      size="sm"
                      style={{ marginRight: "0.5em" }}
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/register">
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
  );
}
