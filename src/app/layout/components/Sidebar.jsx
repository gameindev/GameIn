import { SidebarStyles } from "../../../shared/styles/layouts/SidebarStyles";
import { Hexagon } from "../../../shared/components/Hexagon";
import { theme } from "../../../shared/styles/theme/customTheme";
import { IconPlus, IconX } from "@tabler/icons-react";
import ProfileAvatar from "../../../shared/components/ProfileAvatar";
import { useState, useEffect } from "react";
import { Accordion, Tooltip } from "@mantine/core";
import { Link, useLocation } from "react-router";
import { sidebarItems } from "../../types/sidebar-menu-items.mapper";
import AddFavoriteModal from "../../../shared/components/AddFavoriteUsers";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { currentUser } from "../../../features/auth/store/selector";
import { setFavoriteUsers } from "../../store/slice/favoriteUsersSlice";
import { userFavouriteService } from "../../services/user/user-favourite.service";
import { clearEnrichedUserProfileCache } from "../../services/user/enrich-user-profile.service";
import { getProfileAvatarPath } from "../../../shared/utils/helpers/useProfileMediaUrl.helper";
import { useUserOnlineStatus } from "../../../features/notifications/hooks/useUserOnlineStatus";
import { useOnlineUsers } from "../../../features/notifications/hooks/useOnlineUsers";
import GameInLogo from "../../../assets/homepage/gamein-logo.svg";

// Separate component for favorite user avatar to use hooks properly
const FavoriteUserAvatar = ({ favoriteUser }) => {
  // Use real-time online status from WebSocket, not cached data
  const isOnline = useUserOnlineStatus(favoriteUser.id);

  return (
    <Tooltip label={favoriteUser?.name || favoriteUser?.username}>
      <li>
        <ProfileAvatar
          user={favoriteUser}
          size="50"
          // onClick={() => onRemove(favoriteUser.id)}
          isOnline={isOnline}
          showOnlineStatus={true}
          displayName={favoriteUser?.name || favoriteUser?.username}
        />
      </li>
    </Tooltip>
  );
};

const Sidebar = ({ open = false, onClose }) => {
  const [menuItems] = useState(sidebarItems);
  const [modalOpen, setModalOpen] = useState(false);

  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();
  const favoriteUsers = useAppSelector((s) => s.favUsers?.favoriteUsers || []);
  const userAvatarPath = getProfileAvatarPath(user);

  const { pathname } = useLocation();

  // Initialize online users tracking (uses notification WebSocket)
  useOnlineUsers();

  // Fetch favourites on mount
  useEffect(() => {
    if (user?.id) {
      clearEnrichedUserProfileCache(user.id);
      fetchFavourites();
    }
  }, [user?.id, userAvatarPath]);

  const fetchFavourites = async () => {
    if (!user?.id) return;
    try {
      const favourites = await userFavouriteService.listFavourites(user.id);
      dispatch(setFavoriteUsers(favourites || []));
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  const isMenuItemActive = (item) => {
    if (Array.isArray(item.link)) {
      return item.link.some((path) => pathname.startsWith(path));
    }
    if (item.children?.length > 0) {
      return item.children.some((child) => pathname.startsWith(child.link));
    }
    return pathname.startsWith(item.link);
  };

  const handleAddFavorites = async (newUsers) => {
    if (!user?.id) return;

    try {
      const usersToAdd = newUsers.filter(
        (u) => !favoriteUsers.some((fav) => fav.id === u.id)
      );

      await Promise.all(
        usersToAdd.map((u) => userFavouriteService.addFavourite(user.id, u.id))
      );

      await fetchFavourites();
    } catch (error) {
      console.error("Error adding favourites:", error);
      await fetchFavourites();
    }
  };

  const handleRemoveFavorite = async (id) => {
    if (!user?.id) return;

    try {
      // Remove from API
      await userFavouriteService.removeFavourite(user.id, id);

      // Update local state
      dispatch(setFavoriteUsers(favoriteUsers.filter((u) => u.id !== id)));
    } catch (error) {
      console.error("Error removing favourite:", error);
      // Revert on error - refetch from server
      fetchFavourites();
    }
  };

  return (
    <SidebarStyles $isOpen={open}>
      <div className="drawer-head">
        <img src={GameInLogo} alt="GameIn" />
        <button type="button" aria-label="Close menu" onClick={onClose}>
          <IconX size={18} />
        </button>
      </div>
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

          {favoriteUsers.map((fav) => (
            <FavoriteUserAvatar
              key={fav.id}
              favoriteUser={fav}
            />
          ))}
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
                        px={"1.5em"}
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
                                onClick={onClose}
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
                  <Link
                    to={item.defaultLink || item.link}
                    onClick={onClose}
                    className={active ? "active" : ""}
                  >
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
