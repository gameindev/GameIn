import React, { useState, useEffect, useMemo } from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Text,
  Tabs,
  Checkbox,
  ScrollArea,
  Divider,
  Loader,
  Center,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { followersService } from "../../features/inbox/services/followers.service";
import HexContainer from "./HexContainer";

function AddFavoriteModal({
  opened,
  onClose,
  onAddFavorites,
  onRemoveFavorite,
  user,
  favoriteUsers = [],
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(user);

  // Fetch followers
  const fetchFollowers = async () => {
    try {
      setLoading(true);
      const res = await followersService.fetchFollowers(user.id);
      setFollowers(res || []);
    } catch (err) {
      console.error("Error fetching followers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch following
  const fetchFollowing = async () => {
    try {
      setLoading(true);
      const res = await followersService.fetchFollowing(user.id);
      setFollowing(res || []);
    } catch (err) {
      console.error("Error fetching following:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load data when modal opens
  useEffect(() => {
    if (!opened || !user?.id) return;
    if (activeTab === "followers") fetchFollowers();
    else if (activeTab === "following") fetchFollowing();
    else Promise.all([fetchFollowers(), fetchFollowing()]);
  }, [opened, activeTab, user?.id]);

  // Combine followers + following
  const combinedUsers = useMemo(() => {
    if (activeTab === "followers") return followers;
    if (activeTab === "following") return following;

    const all = [...followers, ...following];
    return Array.from(new Map(all.map((u) => [u.id, u])).values());
  }, [followers, following, activeTab]);

  // Filter by search
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return combinedUsers;
    const q = searchQuery.toLowerCase();
    return combinedUsers.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) ||
        u.username?.toLowerCase().includes(q)
    );
  }, [combinedUsers, searchQuery]);

  // Toggle selection (for adding)
  const toggleUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Add new selected users
  const handleAddFavorites = () => {
    const selected = combinedUsers.filter((u) => selectedUsers.includes(u.id));
    onAddFavorites(selected);
    setSelectedUsers([]);
    onClose();
  };

  // Handle toggle of already favorite user (remove instantly)
  const handleFavoriteToggle = (user) => {
    const isFavorite = favoriteUsers.some((fav) => fav.id === user.id);
    if (isFavorite) {
      onRemoveFavorite(user.id);
    } else {
      toggleUser(user.id);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Add or Remove Favorite Users"
      size="md"
    >
      {/* Search */}
      <TextInput
        placeholder="Search users..."
        icon={<IconSearch size={16} />}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
        mb="md"
      />

      {/* Tabs */}
      <Tabs value={activeTab} onChange={setActiveTab} mb="md">
        <Tabs.List>
          <Tabs.Tab value="all">All</Tabs.Tab>
          <Tabs.Tab value="following">Following</Tabs.Tab>
          <Tabs.Tab value="followers">Followers</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {/* User List */}
      <ScrollArea style={{ height: 300 }} offsetScrollbars scrollbarSize={8}>
        {loading ? (
          <Center mt="md">
            <Loader size="sm" />
          </Center>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((u) => {
            const isFavorite = favoriteUsers.some((fav) => fav.id === u.id);
            const isSelected = selectedUsers.includes(u.id);
            return (
              <Group
                key={u.id}
                justify="space-between"
                p="xs"
                style={{
                  borderRadius: "4px",
                  backgroundColor:
                    isFavorite || isSelected ? "#1A1D2088" : "transparent",
                  cursor: "pointer",
                }}
                onClick={() => handleFavoriteToggle(u)}
              >
                <Group>
                  <HexContainer size={50}>
                    {u.username?.[0]?.toUpperCase() || "?"}
                  </HexContainer>
                  <div>
                    <Text size="sm">{u.name}</Text>
                    <Text size="xs" c="dimmed">
                      {u.username}
                    </Text>
                  </div>
                </Group>
                <Checkbox
                  checked={isFavorite || isSelected}
                  onChange={() => handleFavoriteToggle(u)}
                  transitionDuration={0}
                />
              </Group>
            );
          })
        ) : (
          <Text align="center" c="dimmed" mt="md">
            No users found
          </Text>
        )}
      </ScrollArea>

      <Group justify="flex-end" mt="md">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={handleAddFavorites}
          disabled={selectedUsers.length === 0}
        >
          Add to Favorites
        </Button>
      </Group>
    </Modal>
  );
}

export default AddFavoriteModal;
