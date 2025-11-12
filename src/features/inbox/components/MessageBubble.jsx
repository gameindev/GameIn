import React from "react";
import {
  Paper,
  Text,
  Avatar,
  Group,
  Box,
  Button,
  Image,
  Badge,
  ActionIcon,
  Loader,
} from "@mantine/core";
import {
  IconEdit,
  IconDownload,
  IconFile,
  IconPhoto,
  IconFileText,
  IconFileZip,
  IconClock,
  IconCheck,
  IconChecks,
} from "@tabler/icons-react";
import { theme } from "../../../shared/styles/theme/customTheme";
import HexContainer from "../../../shared/components/HexContainer";
import { inboxAvatar } from "../utils/inboxAvatar";

const MessageBubble = React.memo(function MessageBubble({
  message,
  onViewDocument,
}) {
  const isBot = message.isBot || false;
  const isCurrentUser = message.senderId === message.currentUserId;

  // Helper function to get profile picture URL
  const getProfilePicUrl = (profilePic) => {
    if (!profilePic) return null;
    return profilePic.startsWith("http")
      ? profilePic
      : import.meta.env.VITE_ASSET_URL
      ? `${import.meta.env.VITE_ASSET_URL}/${profilePic}`
      : profilePic;
  };

  // Handle typing indicator
  if (message.isTyping) {
    return (
      <Box
        mb="lg"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Group spacing="xs" mb={5}>
          <Avatar
            color="blue"
            radius="xl"
            size="sm"
            src={getProfilePicUrl(message.senderProfilePic)}
          >
            {message.sender ? message.sender.charAt(0) : "B"}
          </Avatar>
        </Group>
        <Paper
          p="md"
          shadow="sm"
          style={{
            backgroundColor: theme.colors.secondaryGrey[0],
            color: theme.colors.white[0],
            maxWidth: "70%",
            borderRadius: "12px 12px 12px 0",
          }}
        >
          <Group spacing="xs">
            <Loader size="sm" color="gray" />
            <Text size="sm">Typing...</Text>
          </Group>
        </Paper>
      </Box>
    );
  }

  const getFileIcon = (fileType) => {
    if (fileType?.startsWith("image/")) {
      return <IconPhoto size={16} />;
    } else if (fileType?.startsWith("text/")) {
      return <IconFileText size={16} />;
    } else if (fileType?.includes("zip") || fileType?.includes("compressed")) {
      return <IconFileZip size={16} />;
    } else {
      return <IconFile size={16} />;
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);

    // Format date as DD.MM.YYYY
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    // Format time as h:mm am/pm
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    const displayHours = hours % 12 || 12;

    return `${month}.${day}.${year} • ${displayHours}:${minutes} ${ampm.toUpperCase()}`;
  };

  const getMessageStatusIcon = (status) => {
    switch (status) {
      case "sending":
        return <IconClock size={12} color="#ADB5BD" />;
      case "sent":
        return <IconCheck size={12} color="#ADB5BD" />;
      case "delivered":
        return <IconChecks size={12} color="#ADB5BD" />;
      case "read":
        return <IconChecks size={12} color="#4DABF7" />;
      default:
        return null;
    }
  };

  return (
    <Box
      mb="lg"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Group spacing="xs" mb={5} justify="space-between" w="100%">
        <Group>
          {/* <HexContainer size={50}>
                        {getProfilePicUrl(message.senderProfilePic) ? (
                            <img src={getProfilePicUrl(message.senderProfilePic)} alt={message.sender || "avatar"} />
                        ) : (
                            (message.sender?.[0]?.toUpperCase() || "?")
                        )}
                    </HexContainer> */}
          {inboxAvatar(
            getProfilePicUrl(message.senderProfilePic),
            message.sender
          )}
          <Text size="xs" color={theme.colors.inputBgColor[0]}>
            {message.sender || "User"}
          </Text>
        </Group>
        <Group spacing={4}>
          <Text size="xs" color={theme.colors.inputBgColor[0]} opacity={0.6}>
            {formatTimestamp(message.timestamp || message.created_at)}
          </Text>
          {isCurrentUser && getMessageStatusIcon(message.status)}
        </Group>
      </Group>

      <Box w="100%" ps={50}>
        <Box
          p="md"
          // shadow="sm"
          style={{
            backgroundColor: theme.colors.body[0],
            color: "white",
            width: "100%",
            borderRadius: "5px",
          }}
        >
          {message.content && (
            <Text size="sm" style={{ wordBreak: "break-word" }}>
              {message.content}
            </Text>
          )}

          {/* Render attachments if present */}
          {message.attachments && message.attachments.length > 0 && (
            <Box mt={8}>
              {message.attachments.map((attachment, index) => {
                // Check if attachment is an image by mime type or url extension
                const isImage =
                  attachment.type?.startsWith("image/") ||
                  attachment.url?.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i);

                return (
                  <Box key={index} mb={8}>
                    {isImage ? (
                      <Box>
                        <Image
                          src={attachment.url}
                          alt={attachment.name}
                          radius="md"
                          mb={4}
                          sx={{ maxHeight: 200 }}
                        />
                        <Group position="apart">
                          <Text
                            size="xs"
                            color={
                              isCurrentUser
                                ? "rgba(255,255,255,0.7)"
                                : "#ADB5BD"
                            }
                            lineClamp={1}
                          >
                            {attachment.name}
                          </Text>
                          <ActionIcon
                            size="xs"
                            variant="subtle"
                            color={isCurrentUser ? "white" : "gray"}
                          >
                            <IconDownload size={14} />
                          </ActionIcon>
                        </Group>
                      </Box>
                    ) : (
                      <Badge
                        size="lg"
                        radius="sm"
                        color={isCurrentUser ? "blue" : "dark"}
                        leftSection={getFileIcon(attachment.type)}
                        rightSection={
                          <ActionIcon
                            size="xs"
                            variant="subtle"
                            color={isCurrentUser ? "white" : "gray"}
                          >
                            <IconDownload size={14} />
                          </ActionIcon>
                        }
                        fullWidth
                        styles={{
                          root: {
                            padding: "8px 10px",
                            justifyContent: "space-between",
                          },
                        }}
                      >
                        {attachment.name?.length > 20
                          ? `${attachment.name.substring(0, 17)}...`
                          : attachment.name}
                      </Badge>
                    )}
                  </Box>
                );
              })}
            </Box>
          )}

          {/* Document view button for specific messages */}
          {message.showDocumentButton && (
            <Button
              variant="subtle"
              size="xs"
              onClick={onViewDocument}
              mt="xs"
              color="cyan"
              styles={{ root: { color: "#4DABF7" } }}
            >
              view / edit document
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
});

export default MessageBubble;
