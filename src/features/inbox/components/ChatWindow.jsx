import React, { useEffect, useState, useRef, memo } from "react";
import { Box, Text } from "@mantine/core";
import { useAppSelector } from "../../../app/store/hooks";
import { currentUser } from "../../auth/store/selector";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const ChatWindow = ({
  conversation,
  messages = [],
  onSend,
  onlineUsers = [],
  loadingMore = false,
  hasMoreMessages = true,
  onLoadMore,
  onScroll,
  scrollAreaRef,
  acknowledgeMessage,
  showDocumentView,
  setShowDocumentView,
}) => {
  const user = useAppSelector(currentUser);
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [online, setOnline] = useState(false);

  // Derive participant info
  useEffect(() => {
    if (!conversation) return;
    const participants = conversation.participants || conversation.users || [];
    const other = participants.find(
      (p) => (p.user ? p.user.id : p.id) !== user.id
    );
    const otherUser = other?.user || other;

    setDisplayName(
      conversation.title?.trim?.() ||
        otherUser?.username ||
        otherUser?.name ||
        ""
    );

    const picPath = otherUser?.profilepic || otherUser?.profile_pic;
    setAvatarUrl(
      picPath?.startsWith("http")
        ? picPath
        : import.meta.env.VITE_ASSET_URL
        ? `${import.meta.env.VITE_ASSET_URL}/${picPath}`
        : picPath
    );
  }, [conversation, user.id]);

  // Online check
  useEffect(() => {
    const participants =
      conversation?.participants || conversation?.users || [];
    const isOnline = participants.some((p) => {
      const id = p.user ? p.user.id : p.id;
      return (
        id !== user.id && onlineUsers.some((u) => (u.userId ?? u.id) === id)
      );
    });
    setOnline(isOnline);
  }, [conversation, onlineUsers, user.id]);

  if (!conversation) {
    return (
      <Box
        p="xl"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Text color="#ADB5BD">Select a conversation to start chatting</Text>
      </Box>
    );
  }

  return (
    <Box style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ChatHeader
        displayName={displayName}
        avatarUrl={avatarUrl}
        online={online}
      />

      <ChatMessages
        messages={messages}
        userId={user.id}
        hasMoreMessages={hasMoreMessages}
        loadingMore={loadingMore}
        onLoadMore={onLoadMore}
        onScroll={onScroll}
        scrollAreaRef={scrollAreaRef}
        showDocumentView={showDocumentView}
        setShowDocumentView={setShowDocumentView}
        onSend={onSend}
        acknowledgeMessage={acknowledgeMessage}
      />

      <ChatInput onSend={onSend} />
    </Box>
  );
};

export default memo(ChatWindow);
