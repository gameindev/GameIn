import { Button, Center, Checkbox, Divider, Group, Loader, Modal, ScrollArea, Tabs, Text, TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import HexContainer from "../../../shared/components/HexContainer"
import { useCallback, useEffect, useMemo, useState } from "react";
import { followersService } from "../services/followers.service";


const NewChatModal = ({
    opened,
    onClose,
    isGroup = false,
    onCreateChat,
    user,
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const [groupName, setGroupName] = useState("");

    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(false);
    const [duplicateMessage, setDuplicateMessage] = useState("");

    
    useEffect(() => {
        if (!opened || !user?.id) return;

        // Reset form state when modal opens
        setSelectedUsers([]);
        setGroupName("");
        setSearchQuery("");
        setDuplicateMessage("");

        const loadData = async () => {
            setLoading(true);
            try {
                if (activeTab === "followers") {
                    const data = await followersService.fetchFollowers(user.id);
                    setFollowers(data);
                } else if (activeTab === "following") {
                    const data = await followersService.fetchFollowing(user.id);
                    setFollowing(data);
                } else {
                    const [followersData, followingData] = await Promise.all([
                        followersService.fetchFollowers(user.id),
                        followersService.fetchFollowing(user.id)
                    ]);
                    setFollowers(followersData);
                    setFollowing(followingData);
                }
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [opened, activeTab, user?.id]);



    // -- Memoize lowercased search for efficiency
    const lowerSearchQuery = useMemo(() => searchQuery.trim().toLowerCase(), [searchQuery]);

    // Single-pass unique user merge, with stable order and deduplication
    const combinedUsers = useMemo(() => {
        let userList = [];
        if (activeTab === "followers") return followers || [];
        if (activeTab === "following") return following || [];
        // Merge followers and following with deduplication
        const seen = new Set();
        // Prioritize followers, then add following if not in followers
        [...(followers || []), ...(following || [])].forEach((u) => {
            if (u && !seen.has(u.id)) {
                seen.add(u.id);
                userList.push(u);
            }
        });
        return userList;
    }, [followers, following, activeTab]);

    // Efficient search, ignore empty input and avoid recompute when unnecessary
    const filteredUsers = useMemo(() => {
        if (!combinedUsers?.length) return [];
        if (!lowerSearchQuery) return combinedUsers;

        return combinedUsers.filter((u) => {
            const name = u?.name ? u.name.toLowerCase() : "";
            const username = u?.username ? u.username.toLowerCase() : "";
            return (
                name.includes(lowerSearchQuery) ||
                username.includes(lowerSearchQuery)
            );
        });
    }, [combinedUsers, lowerSearchQuery]);

    // Robust toggle for group and 1-to-1 mode
    const handleUserToggle = useCallback((userId) => {
        setSelectedUsers((prev) => {
            if (prev.includes(userId)) {
                return prev.filter((id) => id !== userId);
            }
            // Only allow one selected user in 1-to-1
            return isGroup ? [...prev, userId] : [userId];
        });
    }, [isGroup]);

    // Only extract valid users, ensure no dups, optimize call
    const handleCreateChat = useCallback(async () => {
        if (!selectedUsers.length) return;
        
        setDuplicateMessage(""); // Clear any previous message
        
        const selectedSet = new Set(selectedUsers);
        const selectedUserObjects = combinedUsers.filter((u) => selectedSet.has(u.id));

        try {
            const result = await onCreateChat({
                users: selectedUserObjects,
                isGroup,
                name: isGroup ? groupName.trim() : null,
            });
            
            // If we get a result, it means either a new conversation was created or an existing one was found
            if (result) {
                setSelectedUsers([]);
                setGroupName("");
                setSearchQuery("");
                onClose();
            }
        } catch (error) {
            console.error('Error creating chat:', error);
            setDuplicateMessage("Failed to create chat. Please try again.");
        }
    }, [selectedUsers, combinedUsers, isGroup, groupName, onCreateChat, onClose]);

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={isGroup ? "Create New Group" : "Start New Chat"}
            size="md"
        >
            {isGroup && (
                <>
                    <TextInput
                        label="Group Name"
                        placeholder="Enter group name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.currentTarget.value)}
                        mb="md"
                        required
                    />
                    <Divider my="sm" />
                </>
            )}

            <Text size="sm" fw={500} mb="xs">
                Select {isGroup ? "members" : "a user"} to chat with
            </Text>

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

            <ScrollArea style={{ height: 300 }} offsetScrollbars scrollbarSize={8}>
                {loading ? (
                    <Center mt="md">
                        <Loader size="sm" />
                    </Center>
                ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <Group
                            key={user.id}
                            justify="space-between"
                            p="xs"
                            style={{
                                borderRadius: "4px",
                                backgroundColor: selectedUsers.includes(user.id)
                                    ? "#1A1D2088"
                                    : "transparent",
                                cursor: "pointer",
                            }}
                            onClick={() => handleUserToggle(user.id)}
                        >
                            <Group>
                                <HexContainer size={50}>
                                    {user.username?.[0]?.toUpperCase() || "?"}
                                </HexContainer>
                                <div>
                                    <Text size="sm">{user.name}</Text>
                                    <Text size="xs" c="dimmed">
                                        {user.username}
                                    </Text>
                                </div>
                            </Group>
                            {isGroup && (
                                <Checkbox
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => { }}
                                    transitionDuration={0}
                                />
                            )}
                        </Group>
                    ))
                ) : (
                    <Text align="center" c="dimmed" mt="md">
                        No users found
                    </Text>
                )}
            </ScrollArea>

            {duplicateMessage && (
                <Text size="sm" color="orange" mt="md" ta="center">
                    {duplicateMessage}
                </Text>
            )}

            <Group justify="flex-end" mt="md">
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    onClick={handleCreateChat}
                    disabled={selectedUsers.length === 0 || (isGroup && !groupName)}
                >
                    {isGroup ? "Create Group" : "Start Chat"}
                </Button>
            </Group>
        </Modal>
    )
}

export default NewChatModal