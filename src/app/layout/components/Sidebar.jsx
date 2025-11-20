import { SidebarStyles } from "../../../shared/styles/layouts/SidebarStyles";
import { Hexagon } from "../../../shared/components/Hexagon";
import { theme } from "../../../shared/styles/theme/customTheme";
import { IconPlus } from "@tabler/icons-react";
import AvatarSection from "../../../shared/components/AvatarSection";
import coverImage from "../../../assets/creators/creator_image.jpg";
import { useState } from "react";
import { Accordion, Tooltip } from "@mantine/core";
import { Link, useLocation } from "react-router";
import { sidebarItems } from "../../types/sidebar-menu-items.mapper";
import AddFavoriteModal from "../../../shared/components/AddFavoriteUsers";
import { useAppSelector } from "../../store/hooks";
import { currentUser } from "../../../features/auth/store/selector";

const Sidebar = () => {
  const [menuItems, setMenuItems] = useState(sidebarItems);
  const [favoriteUsers, setFavoriteUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const user = useAppSelector(currentUser);

  const { pathname } = useLocation();

  const isMenuItemActive = (item) => {
    if (item.children?.length > 0) {
      return item.children.some((child) => pathname.startsWith(child.link));
    }

    return item.link && pathname.startsWith(item.link);
  };

  const handleAddFavorites = (newUsers) => {
    setFavoriteUsers((previousUsers) => {
      const updatedList = [...previousUsers];
      newUsers.forEach((user) => {
        const alreadyExists = updatedList.some((u) => u.id === user.id);
        if (!alreadyExists) {
          updatedList.push(user);
        }
      });
      return updatedList;
    });
  };

  const handleRemoveFavorite = (id) => {
    setFavoriteUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // const handleActive = (itemKey, childKey = null) => {
  //   setMenuItems((prev) =>
  //     prev.map((item, index) => {
  //       const isParentActive = index === itemKey;

  //       if (!item.children) {
  //         return {
  //           ...item,
  //           active: isParentActive,
  //           activeChild: null,
  //         };
  //       }

  //       return {
  //         ...item,
  //         active: isParentActive,
  //         activeChild: isParentActive ? childKey : null,
  //       };
  //     })
  //   );
  // };

  return (
    <SidebarStyles>
      {/* Favorite Icons Section */}
      <div className="profile-icons">
        <ul>
          <li>
            <Tooltip label={"Add Favorite users"} withArrow>
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
                <IconPlus size="1.25em" color={theme.colors.primary[0]} />
              </Hexagon>
            </Tooltip>
          </li>

          {favoriteUsers.map((user) => {
            const avatar =
              user.brand_profile?.profile_image ||
              user.creator_profile?.profile_image ||
              coverImage;

            return (
              <Tooltip key={user.id} label={user?.name || user?.username}>
                <li key={user.id}>
                  <AvatarSection
                    size="50"
                    avatar={avatar}
                    onClick={() => handleRemoveFavorite(user.id)}
                  />
                </li>
              </Tooltip>
            );
          })}
        </ul>
      </div>

      {/* Menu Section */}
      <div className="profile-links">
        <ul>
          {menuItems.map((item, index) => {
            const active = isMenuItemActive(item);
            const hasChildren = item.children?.length > 0;

            return (
              <li key={index} className={active ? "active" : ""}>
                {hasChildren ? (
                  <Accordion
                    className="menu-accordion"
                    variant="unstyled"
                    radius="md"
                    defaultValue={active ? item.label.toLowerCase() : undefined}
                  >
                    <Accordion.Item value={item.label.toLowerCase()}>
                      <Accordion.Control
                        icon={item.icon}
                        className={active ? "active" : ""}
                      >
                        {item.label}
                      </Accordion.Control>

                      <Accordion.Panel>
                        <ul>
                          {item.children.map((child, cIndex) => (
                            <li key={cIndex}>
                              <Link
                                to={child.link}
                                className={
                                  pathname.startsWith(child.link)
                                    ? "active"
                                    : ""
                                }
                              >
                                {child.icon}
                                <span>{child.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                ) : (
                  <Link to={item.link} className={active ? "active" : ""}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                )}

                {index % 2 !== 0 && <div className="divider"></div>}
              </li>
            );
          })}
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
