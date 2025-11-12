import { ActionIcon, Badge, Box, Group, Text, Tooltip } from "@mantine/core";
import React, { useEffect, useState } from "react";
import HexContainer from "../../../shared/components/HexContainer";
import { IconDotsVertical } from "@tabler/icons-react";
import { useAppSelector } from "../../../app/store/hooks";
import { currentUser } from "../../auth/store/selector";
import { formatTimeHelper } from "../utils/helper";
import { theme } from "../../../shared/styles/theme/customTheme";
import { inboxAvatar } from "../utils/inboxAvatar";

const ContactItem = function ContactItem({
  conversation,
  selected,
  onSelect,
  online,
}) {
  const [showActions, setShowActions] = React.useState(false);
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const user = useAppSelector(currentUser);

  useEffect(() => {
    // console.log('ContactItem received conversation:', conversation);
    // console.log('Last message:', conversation?.lastMessage);

    // Handle both nested structure (API response) and flat structure (our enriched data)
    const participants =
      conversation?.participants || conversation?.users || [];
    const other = participants.find((p) => {
      // Handle nested structure: {user: {id, username, profilepic}}
      const participantId = p.user ? p.user.id : p.id;
      return participantId !== user.id;
    });

    // Extract user data from nested structure if needed
    const otherUser = other?.user || other;
    // console.log('Other participant:', otherUser);

    const nameFromTitle =
      typeof conversation?.title === "string"
        ? conversation.title.trim()
        : conversation?.title;
    const name = nameFromTitle
      ? nameFromTitle
      : otherUser?.username || otherUser?.name;
    // console.log('Display name:', name);
    setDisplayName(name || "");

    const picPath = otherUser?.profilepic || otherUser?.profile_pic;
    let pic = null;
    if (picPath) {
      pic = picPath.startsWith("http")
        ? picPath
        : import.meta.env.VITE_ASSET_URL
        ? `${import.meta.env.VITE_ASSET_URL}/${picPath}`
        : picPath;
    }
    // console.log('Avatar URL:', pic);
    setAvatarUrl(pic);
  }, [
    conversation,
    conversation?.participants,
    conversation?.users,
    conversation?.title,
    user.id,
  ]);

  return (
    <Box
      mb="sm"
      style={{
        backgroundColor: selected ? "#343A40" : "transparent",
        borderRadius: 8,
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        opacity: conversation.unread ? 1 : 0.8,
        fontWeight: conversation.unread ? 600 : 400,
        borderLeft: conversation.unread
          ? `3px solid ${theme.colors.teal}`
          : "3px solid transparent",
      }}
      onClick={() => onSelect(conversation)}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <Group position="apart" w="100%">
        <Group spacing="sm" w="100%">
          <Box style={{ position: "relative" }}>
            {inboxAvatar(avatarUrl, displayName)}
            {online && (
              <Box
                style={{
                  position: "absolute",
                  bottom: 5,
                  right: 3,
                  width: 7,
                  height: 7,
                  backgroundColor: online ? "#20C997" : "#343A40",
                  borderRadius: "50%",
                  // border: "2px solid #212529",
                }}
              />
            )}
          </Box>
          <Box
            style={{ flex: 1, maxWidth: "calc(100% - 50px)", width: "100%" }}
          >
            <Group position="apart" style={{ justifyContent: "space-between" }}>
              <Text
                // weight={conversation.unread ? 700 : 400}
                color="#E9ECEF"
                size="sm"
              >
                {displayName
                  ? displayName.charAt(0).toUpperCase() + displayName.slice(1)
                  : ""}
              </Text>
              <Group
                spacing={4}
                style={{
                  opacity: showActions ? 1 : 0,
                  transition: "opacity 0.2s ease",
                }}
              >
                {/* {conversation.pinned && (
                                    <Tooltip label="Pinned" position="top">
                                        <ActionIcon size="xs" variant="transparent" color="gray">
                                            <IconPin size={14} />
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                                {conversation.muted && (
                                    <Tooltip label="Muted" position="top">
                                        <ActionIcon size="xs" variant="transparent" color="gray">
                                            <IconHeadphonesOff size={14} />
                                        </ActionIcon>
                                    </Tooltip>
                                )} */}
                <Tooltip label="More options" position="top">
                  <ActionIcon size="xs" variant="transparent" color="gray">
                    <IconDotsVertical size={14} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Group>
            <Group position="apart" mt={4}>
              <Text
                size="xs"
                color="#ADB5BD"
                lineClamp={1}
                style={{ maxWidth: "70%" }}
              >
                {conversation.lastMessage
                  ? typeof conversation.lastMessage === "string"
                    ? conversation.lastMessage
                    : conversation.lastMessage.content
                  : conversation.unread && conversation.unreadCount > 0
                  ? "New message received"
                  : "No messages yet"}
              </Text>
              <Group spacing={4}>
                <Text size="xs" color="#6C757D">
                  {conversation.lastMessage?.timestamp
                    ? formatTimeHelper(conversation.lastMessage.timestamp)
                    : formatTimeHelper(conversation.joined_at)}
                </Text>
                {conversation.unread && (
                  <Badge size="xs" color="teal" variant="filled" radius="xl">
                    {conversation.unreadCount > 0
                      ? conversation.unreadCount
                      : "new"}
                  </Badge>
                )}
              </Group>
            </Group>
          </Box>
        </Group>
      </Group>
      {/* <Text size="xs" color="#ADB5BD" lineClamp={1} mt={4}>
                {conversation.lastMessage}
            </Text> */}
    </Box>
  );
};

export default React.memo(ContactItem);
