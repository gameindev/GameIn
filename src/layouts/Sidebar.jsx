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
import React from "react";
import { Link, useLocation } from "react-router";
import { SidebarStyles } from "../styles/layouts";
import { Hexagon } from "../components/shared/ui/HexagonDemo";
import { theme } from "../styles/theme/customTheme";
import coverImage from "../assets/creators/creator_image.jpg";
import AvatarSection from "./../components/shared/ui/AvatarSection";
import routePaths from "../routes/endpoints";
import { Accordion } from "@mantine/core";
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
      active: false,
      link: routePaths.ACCOUNTS.DASHBOARD.ROOT,
    },
    {
      icon: <IconNews size="1em" />,
      label: "News Feed",
      active: false,
      link: routePaths.ACCOUNTS.DASHBOARD.ROOT,
    },
    {
      icon: <IconStar size="1em" />,
      label: "Creators",
      active: false,
      link: routePaths.SEARCH.replace(":userType", "creator"),
    },
    {
      icon: <IconFlame size="1em" />,
      label: "Brands",
      active: false,
      link: routePaths.SEARCH.replace(":userType", "brand"),
    },
    {
      icon: <IconSettings2 size="1em" />,
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
  }
  // const isActive = (itemPath, currentPath) => {
  //   if (itemPath === "/") return currentPath === "/";
  //   return currentPath === itemPath || currentPath.startsWith(itemPath + "/");
  // };

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
          {/* {sidebarItems.map((item, index) => {
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
          })} */}
        </ul>
      </div>
    </SidebarStyles>
  );
}
