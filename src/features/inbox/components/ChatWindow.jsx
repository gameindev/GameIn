import React, { useEffect, useState, useRef, memo } from "react";
import { Box, Text } from "@mantine/core";
import { useAppSelector } from "../../../app/store/hooks";
import { currentUser } from "../../auth/store/selector";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { getProfileAvatarUrl } from "../../../shared/utils/helpers/useProfileMediaUrl.helper";

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
    onBack,
    showBack = false,
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

        setAvatarUrl(getProfileAvatarUrl(otherUser));
    }, [conversation, user.id]);

    // Online check
    useEffect(() => {
        if (!conversation || !onlineUsers || onlineUsers.length === 0) {
            setOnline(false);
            return;
        }

        const participants =
            conversation?.participants || conversation?.users || [];
        
        const isOnline = participants.some((p) => {
            const participantId = p.user ? p.user.id : p.id;
            if (participantId === user.id) return false; // Skip current user
            
            return onlineUsers.some((u) => {
                const onlineUserId = u.userId ?? u.id;
                return onlineUserId === participantId;
            });
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
        <Box className="chat-window" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <ChatHeader
                displayName={displayName}
                avatarUrl={avatarUrl}
                online={online}
                onBack={onBack}
                showBack={showBack}
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
                onlineUsers={onlineUsers}
            />

            <ChatInput onSend={onSend} />
        </Box>
    );
};

export default memo(ChatWindow);
