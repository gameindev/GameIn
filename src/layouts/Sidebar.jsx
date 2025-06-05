import { Bolt, Flame, Home, Newspaper, Plus, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { SidebarStyles } from "../styles/layouts";
import { Hexagon } from "../components/shared/HexagonDemo";
import { theme } from "../styles/theme/customTheme";
import AvatarSection from "../components/userProfileBanner/AvatarSection";
import coverImage from "../assets/creators/creator_image.jpg";

export default function Sidebar() {

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
                $border="0.125rem solid #FFF"
              >
                <Plus size='1.25rem' color={theme.colors.primary[0]} />
              </Hexagon>
            </li>
            <li>
                <AvatarSection className="avatar-icon-small" size="3em" avatar={coverImage} />
            </li>
            <li>
                <AvatarSection className="avatar-icon-small" size="3em" avatar={coverImage} />
            </li>
            <li>
                <AvatarSection className="avatar-icon-small" size="3em" avatar={coverImage} />
            </li>
            <li>
                <AvatarSection className="avatar-icon-small" size="3em" avatar={coverImage} />
            </li>
          </ul>
        </div>
        <div className="profile-links">
          <ul>
            <li>
              <Link to="/">
                <Home size="1rem"/>
                <span>Account</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <Newspaper size="1rem" />
                <span>News Feed</span>
              </Link>
            </li>
            <div className="divider"></div>
            <li>
              <Link to="/">
                <Star size="1rem" />
                <span>Creators</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <Flame size="1rem" />
                <span>Brands</span>
              </Link>
            </li>
            <div className="divider"></div>
            <li>
              <Link to="/">
                <Bolt size="1rem" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </SidebarStyles>
  );
}
