import {
  Bell,
  Bolt,
  ChevronDown,
  CreditCard,
  Flame,
  Home,
  Newspaper,
  Plug2,
  Plus,
  Shield,
  Star,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { SidebarStyles } from "../styles/layouts";
import { Hexagon } from "../components/shared/ui/HexagonDemo";
import { theme } from "../styles/theme/customTheme";
import coverImage from "../assets/creators/creator_image.jpg";
import AvatarSection from "./../components/shared/ui/AvatarSection";
import routePaths from "../routes/endpoints";
import { Accordion } from "@mantine/core";

export default function Sidebar() {
  const sidebarItems = [
    {
      icon: <Home size="1em" />,
      label: "Account",
      active: false,
      link: routePaths.ACCOUNTS.DASHBOARD.ROOT,
    },
    {
      icon: <Newspaper size="1em" />,
      label: "News Feed",
      active: false,
      link: routePaths.ACCOUNTS.DASHBOARD.ROOT,
    },
    {
      icon: <Star size="1em" />,
      label: "Creators",
      active: false,
      link: routePaths.SEARCH.replace(":userType", "creator"),
    },
    {
      icon: <Flame size="1em" />,
      label: "Brands",
      active: false,
      link: routePaths.SEARCH.replace(":userType", "brand"),
    },
    {
      icon: <Bolt size="1em" />,
      label: "Settings",
      active: false,
      link: '#',
      children: [
        {
          icon: <User size="1em" />,
          label: "Account",
          active: false,
          link: routePaths.SETTINGS.ACCOUNT,
        },
        {
          icon: <Plug2 size="1em" />,
          label: "Integrations",
          active: false,
          link: routePaths.SETTINGS.INTEGRATIONS,
        },
        {
          icon: <Bell size="1em" />,
          label: "Notifications",
          active: false,
          link: routePaths.SETTINGS.NOTIFICATIONS,
        },
        {
          icon: <Shield size="1em" />,
          label: "Privacy",
          active: false,
          link: routePaths.SETTINGS.PRIVACY,
        },
        {
          icon: <CreditCard size="1em" />,
          label: "Payments",
          active: false,
          link: routePaths.SETTINGS.PAYMENTS,
        },
      ],
    },
  ];

  const [menuItems, setMenuItems] = useState(sidebarItems);

  const handleActive = key => {
    setMenuItems(prevItems =>
      prevItems.map((item, index) =>
        index === key ? { ...item, active: true } : { ...item, active: false }
      )
    );
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
          {menuItems?.map(({ link, label, icon, children }, index) => (
            <li key={index}>
              <Accordion className="menu-accordion" variant="unstyled" radius="md" defaultValue="submenu">
                <Accordion.Item value={label.toLowerCase()}>
                  <Link to={link}>
                     <Accordion.Control icon={icon} chevron={children ? '' : <></> }>{label}</Accordion.Control>
                  </Link>
                  {children && (
                    <Accordion.Panel>
                      <ul>
                        {children?.map(({ link, label, icon, active }, subIndex) => (
                          <li key={subIndex}>
                            <Link to={link} className={active ? "active" : ""} onClick={() => handleActive(index)}>
                              {icon}
                              <span>{label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Panel>
                  )}
                </Accordion.Item>
              </Accordion>
              {index % 2 !== 0 && <div className="divider"></div>}
            </li>
          ))}
        </ul>
      </div>
    </SidebarStyles>
  );
}
