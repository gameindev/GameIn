import { SidebarStyles } from "../../../shared/styles/layouts/SidebarStyles";
import { Hexagon } from "../../../shared/components/Hexagon";
import { theme } from "../../../shared/styles/theme/customTheme";
import { IconPlus } from "@tabler/icons-react";
import AvatarSection from "../../../shared/components/AvatarSection";
import { useState, useEffect } from "react";
import { Accordion, Tooltip } from "@mantine/core";
import { Link, useLocation } from "react-router";
import { sidebarItems } from "../../types/sidebar-menu-items.mapper";
import AddFavoriteModal from "../../../shared/components/AddFavoriteUsers";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { currentUser } from "../../../features/auth/store/selector";
import { setFavoriteUsers } from "../../store/slice/favoriteUsersSlice";
import { userFavouriteService } from "../../services/user/user-favourite.service";
import { useUserOnlineStatus } from "../../../features/notifications/hooks/useUserOnlineStatus";
import { useOnlineUsers } from "../../../features/notifications/hooks/useOnlineUsers";
import getInitials from "../../../shared/utils/helpers/getInitials.helper";

// Separate component for favorite user avatar to use hooks properly
const FavoriteUserAvatar = ({ favoriteUser, onRemove }) => {
  // Use real-time online status from WebSocket, not cached data
  const isOnline = useUserOnlineStatus(favoriteUser.id);

  const profile =
    favoriteUser.creator_profile ||
    favoriteUser.brand_profile ||
    favoriteUser.community_profile;
  const avatarPath =
    favoriteUser.brand_profile?.profile_image?.path ||
    favoriteUser.creator_profile?.profile_image?.path ||
    favoriteUser.community_profile?.profile_image?.path;
  const avatar = avatarPath
    ? `${import.meta.env.VITE_ASSET_URL}/${avatarPath}`
    : null;

  return (
    <Tooltip label={favoriteUser?.name || favoriteUser?.username}>
      <li>
        <AvatarSection
          size="50"
          avatar={avatar}
          // onClick={() => onRemove(favoriteUser.id)}
          isOnline={isOnline}
          showOnlineStatus={true}
          profileUsername={favoriteUser?.username}
          displayName={favoriteUser?.name || favoriteUser?.username}
        //   firstName={profile?.first_name}
        //   lastName={profile?.last_name}
        />
      </li>
    </Tooltip>
  );
};

const Sidebar = () => {
  const [menuItems] = useState(sidebarItems);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();
  const favoriteUsers = useAppSelector((s) => s.favUsers?.favoriteUsers || []);

  const { pathname } = useLocation();

  // Initialize online users tracking (uses notification WebSocket)
  useOnlineUsers();

  // Fetch favourites on mount
  useEffect(() => {
    if (user?.id) {
      fetchFavourites();
    }
  }, [user?.id]);

  const fetchFavourites = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const favourites = await userFavouriteService.listFavourites(user.id);
      console.log(favourites);
      dispatch(setFavoriteUsers(favourites || []));
    } catch (error) {
      console.error("Error fetching favourites:", error);
    } finally {
      setLoading(false);
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
      // Add each user to favourites via API
      const addPromises = newUsers.map((u) => {
        // Check if already in local state to avoid duplicates
        if (!favoriteUsers.some((fav) => fav.id === u.id)) {
          return userFavouriteService.addFavourite(user.id, u.id);
        }
        return Promise.resolve();
      });

      await Promise.all(addPromises);

      // Update local state
      const updatedList = [...favoriteUsers];
      newUsers.forEach((u) => {
        if (!updatedList.some((x) => x.id === u.id)) {
          updatedList.push(u);
        }
      });
      dispatch(setFavoriteUsers(updatedList));
    } catch (error) {
      console.error("Error adding favourites:", error);
      // Still update UI optimistically, but show error
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

          {favoriteUsers.map((fav) => (
            <FavoriteUserAvatar
              key={fav.id}
              favoriteUser={fav}
              onRemove={handleRemoveFavorite}
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
