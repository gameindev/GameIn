import React, { useState, useEffect, useMemo } from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Text,
  Tabs,
  ScrollArea,
  Divider,
  Loader,
  Center,
  ActionIcon,
} from "@mantine/core";
import {
  IconSearch,
  IconStar,
  IconStarFilled,
  IconTrash,
} from "@tabler/icons-react";
import { followersService } from "../../features/inbox/services/followers.service";
import ProfileAvatar from "./ProfileAvatar";

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

  const fetchFollowers = async () => {
    try {
      setLoading(true);
      const res = await followersService.fetchFollowers(user.id);
      setFollowers(res || []);
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowing = async () => {
    try {
      setLoading(true);
      const res = await followersService.fetchFollowing(user.id);
      setFollowing(res || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!opened || !user?.id) return;

    if (activeTab === "followers") fetchFollowers();
    else if (activeTab === "following") fetchFollowing();
    else Promise.all([fetchFollowers(), fetchFollowing()]);
  }, [opened, activeTab, user?.id]);

  const combinedUsers = useMemo(() => {
    if (activeTab === "followers") return followers;
    if (activeTab === "following") return following;

    const all = [...followers, ...following];
    return Array.from(new Map(all.map((u) => [u.id, u])).values());
  }, [followers, following, activeTab]);

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return combinedUsers;
    const q = searchQuery.toLowerCase();
    return combinedUsers.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) ||
        u.username?.toLowerCase().includes(q)
    );
  }, [combinedUsers, searchQuery]);

  const toggleSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleRemove = async (id) => {
    await onRemoveFavorite(id);
  };

  const handleAddFavorites = async () => {
    const usersToAdd = combinedUsers.filter((u) =>
      selectedUsers.includes(u.id)
    );

    if (usersToAdd.length) {
      await onAddFavorites(usersToAdd);
    }

    setSelectedUsers([]);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Manage Favorite Users"
      size="md"
    >
      <TextInput
        placeholder="Search users..."
        icon={<IconSearch size={16} />}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
        mb="md"
      />

      <Tabs value={activeTab} onChange={setActiveTab} mb="md">
        <Tabs.List>
          <Tabs.Tab value="all">All</Tabs.Tab>
          <Tabs.Tab value="following">Following</Tabs.Tab>
          <Tabs.Tab value="followers">Followers</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <ScrollArea h={300}>
        {loading ? (
          <Center mt="md">
            <Loader size="sm" />
          </Center>
        ) : filteredUsers.length ? (
          filteredUsers.map((u) => {
            const isFavorite = favoriteUsers.some((f) => f.id === u.id);
            const isSelected = selectedUsers.includes(u.id);
            
            return (
              <Group
                key={u.id}
                justify="space-between"
                p="xs"
                mb={6}
                style={{
                  borderRadius: 8,
                  backgroundColor:
                    isFavorite || isSelected ? "#1A1D20" : "transparent",
                }}
              >
                <Group>
                  <ProfileAvatar user={u} size={48} profilePath="" />

                  <div>
                    <Text size="sm">{u.name}</Text>
                    <Text size="sm" fw={600}>
                      {u.username}
                    </Text>
                  </div>
                </Group>

                <Group gap="xs">
                  {isFavorite ? (
                    <IconStarFilled size={18} color="#facc15" />
                  ) : null}

                  {!isFavorite && (
                    // <Checkbox
                    //   checked={isSelected}
                    //   onChange={() => toggleSelect(u.id)}
                    // />

                    <ActionIcon
                      variant="subtle"
                      color={isFavorite ? "yellow" : "gray"}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelect(u.id);
                      }}
                    >
                      {isFavorite || isSelected ? (
                        <IconStarFilled size={18} />
                      ) : (
                        <IconStar size={18} />
                      )}
                    </ActionIcon>
                  )}

                  {isFavorite && (
                    <ActionIcon
                      color="red"
                      variant="subtle"
                      onClick={() => handleRemove(u.id)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  )}
                </Group>
              </Group>
            );
          })
        ) : (
          <Text align="center" c="dimmed" mt="md">
            No users found
          </Text>
        )}
      </ScrollArea>

      <Divider my="md" />

      <Group justify="flex-end">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleAddFavorites} disabled={!selectedUsers.length}>
          Add to Favorites
        </Button>
      </Group>
    </Modal>
  );
}

export default AddFavoriteModal;
