import React from "react";
import { Link, useLocation } from "react-router";
import { SidebarStyles } from "../styles/layouts";
import { Hexagon } from "../components/shared/ui/HexagonDemo";
import { theme } from "../styles/theme/customTheme";
import coverImage from "../assets/creators/creator_image.jpg";
import AvatarSection from "./../components/shared/ui/AvatarSection";
import routePaths from "../routes/endpoints";
import {
  IconFlame,
  IconHome,
  IconNews,
  IconPlus,
  IconSettings2,
  IconStar,
} from "@tabler/icons-react";

export default function Sidebar() {
  const location = useLocation();

  const sidebarItems = [
    {
      icon: <IconHome size="1em" />,
      label: "Account",
      link: routePaths.ACCOUNTS.DASHBOARD.ROOT,
    },
    {
      icon: <IconNews size="1em" />,
      label: "News Feed",
      link: routePaths.ACCOUNTS.NEWSFEED.ROOT,
    },
    {
      icon: <IconStar size="1em" />,
      label: "Creators",
      link: routePaths.SEARCH.replace(":userType", "creator"),
    },
    {
      icon: <IconFlame size="1em" />,
      label: "Brands",
      link: routePaths.SEARCH.replace(":userType", "brand"),
    },
    {
      icon: <IconSettings2 size="1em" />,
      label: "Settings",
      link: routePaths.SETTINGS.ROOT,
    },
  ];

  const isActive = (itemPath, currentPath) => {
    if (itemPath === "/") return currentPath === "/";
    return currentPath === itemPath || currentPath.startsWith(itemPath + "/");
  };

  return (
    <SidebarStyles>
      <div className="profile-icons">
        <ul>
          <li>
            <Hexagon
              className="profile-hexagon"
              $mainRadius={10}
              $roundingRadius={15}
              size="3em"
              $backgroundColor={theme.colors.inputBgColor[0]}
              $rotated
              $border="0.125em solid #FFF"
            >
              <IconPlus size="1.25em" color={theme.colors.primary[0]} />
            </Hexagon>
          </li>
          {[...Array(4)].map((_, i) => (
            <li key={i}>
              <AvatarSection size="50" avatar={coverImage} />
            </li>
          ))}
        </ul>
      </div>
      <div className="profile-links">
        <ul>
          {sidebarItems.map((item, index) => {
            const active = isActive(item.link, location.pathname);
            return (
              <li key={index} className={active ? "active" : ""}>
                <Link to={item.link}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
                {index % 2 !== 0 && <div className="divider"></div>}
              </li>
            );
          })}
        </ul>
      </div>
    </SidebarStyles>
  );
}
