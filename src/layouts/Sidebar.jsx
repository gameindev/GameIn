import { Bolt, Flame, Home, Newspaper, Plus, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { SidebarStyles } from "../styles/layouts";
import { Hexagon } from "../components/shared/ui/HexagonDemo";
import { theme } from "../styles/theme/customTheme";
import coverImage from "../assets/creators/creator_image.jpg";
import AvatarSection from "./../components/shared/ui/AvatarSection";
import routePaths from "../routes/endpoints";

export default function Sidebar() {
  const sidebarItems = [
    {
      icon: <Home size="1em" />,
      label: "Account",
      link: routePaths.ACCOUNTS.DASHBOARD.ROOT,
    },
    {
      icon: <Newspaper size="1em" />,
      label: "News Feed",
      link: routePaths.ACCOUNTS.DASHBOARD.ROOT,
    },
    {
      icon: <Star size="1em" />,
      label: "Creators",
      link: routePaths.SEARCH.replace(":userType", "creators"),
    },
    {
      icon: <Flame size="1em" />,
      label: "Brands",
      link: routePaths.SEARCH.replace(":userType", "brands"),
    },
    {
      icon: <Bolt size="1em" />,
      label: "Settings",
      link: routePaths.ACCOUNTS.DASHBOARD.ROOT,
    },
  ];

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
              $border="0.125emsolid #FFF"
            >
              <Plus size="1.25em" color={theme.colors.primary[0]} />
            </Hexagon>
          </li>
          <li>
            <AvatarSection size="50" avatar={coverImage} />
          </li>
          <li>
            <AvatarSection size="50" avatar={coverImage} />
          </li>
          <li>
            <AvatarSection size="50" avatar={coverImage} />
          </li>
          <li>
            <AvatarSection size="50" avatar={coverImage} />
          </li>
        </ul>
      </div>
      <div className="profile-links">
        <ul>
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <Link to={item.link}>
                {item.icon}
                <span>{item.label}</span>
              </Link>
              {index % 2 !== 0 && <div className="divider"></div>}
            </li>
          ))}
        </ul>
      </div>
    </SidebarStyles>
  );
}
