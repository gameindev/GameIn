import { SidebarStyles } from "../../../shared/styles/layouts/SidebarStyles";
import { Hexagon } from "../../../shared/components/Hexagon";
import { theme } from "../../../shared/styles/theme/customTheme";
import { IconPlus } from "@tabler/icons-react";
import AvatarSection from "../../../shared/components/AvatarSection";
import coverImage from "../../../assets/creators/creator_image.jpg";
import { useState } from "react";
import { Accordion } from "@mantine/core";
import { Link } from "react-router";
import { sidebarItems } from "../../types/sidebar-menu-items.mapper";
import AddFavoriteModal from "../../../shared/components/AddFavoriteUsers";
import { useAppSelector } from "../../store/hooks";
import { currentUser } from "../../../features/auth/store/selector";

const Sidebar = () => {
  const [menuItems, setMenuItems] = useState(sidebarItems);
  const [favoriteUsers, setFavoriteUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const user = useAppSelector(currentUser);

  const handleAddFavorites = (users) => {
    setFavoriteUsers((prev) => {
      const unique = [...prev, ...users].filter(
        (v, i, a) => a.findIndex((u) => u.id === v.id) === i
      );
      return unique;
    });
  };

  const handleRemoveFavorite = (id) => {
    setFavoriteUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleActive = (key) => {
    setMenuItems((prevItems) =>
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
              $border="0.125em solid #FFF"
              onClick={() => setModalOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <IconPlus
                size="1.25em"
                className="cursor-pointer"
                color={theme.colors.primary[0]}
              />
            </Hexagon>
          </li>
          {favoriteUsers.map((user) => {
            const brandImage = user?.brand_profile?.profile_image;
            const creatorImage = user?.creator_profile?.profile_image;

            const avatar = brandImage || creatorImage || coverImage;

            return (
              <li
                key={user.id}
                title={`${user.name || user.username}`}
                style={{ position: "relative" }}
              >
                <AvatarSection
                  size="50"
                  avatar={avatar}
                  onClick={() => handleRemoveFavorite(user.id)}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="profile-links">
        <ul>
          {menuItems?.map(({ link, label, icon, children }, index) => (
            <li key={index}>
              <Accordion
                className="menu-accordion"
                variant="unstyled"
                radius="md"
                defaultValue="submenu"
              >
                <Accordion.Item value={label.toLowerCase()}>
                  <Link to={link}>
                    <Accordion.Control
                      icon={icon}
                      chevron={children ? "" : <></>}
                    >
                      {label}
                    </Accordion.Control>
                  </Link>
                  {children && (
                    <Accordion.Panel>
                      <ul>
                        {children?.map(
                          ({ link, label, icon, active }, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={link}
                                className={active ? "active" : ""}
                                onClick={() => handleActive(index)}
                              >
                                {icon}
                                <span>{label}</span>
                              </Link>
                            </li>
                          )
                        )}
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

      <AddFavoriteModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        user={user}
        onAddFavorites={handleAddFavorites}
        onRemoveFavorite={handleRemoveFavorite}
        favoriteUsers={favoriteUsers}
      />
    </SidebarStyles>
  );
};

export default Sidebar;
