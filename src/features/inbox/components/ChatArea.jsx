import { Box, Text, Loader, Center, Button } from "@mantine/core";
import { theme } from "../../../shared/styles/theme/customTheme";
import ChatWindow from "./ChatWindow";
import { useMessageManagement } from "../hooks/useMessageManagement";
import { useState, useRef, useEffect } from "react";

const ChatArea = ({ selectedConversation, onlineUsers = [], onMarkAsRead = null }) => {
    const [showDocumentView, setShowDocumentView] = useState(false);
    const scrollAreaRef = useRef(null);

    const {
        messages,
        loading,
        loadingMore,
        error,
        hasMoreMessages,
        sendingMessages,
        sendMessage,
        loadMoreMessages,
        markConversationAsRead,
        addTypingIndicator,
        clearError,
        acknowledgeMessage,
    } = useMessageManagement(selectedConversation?.id, onMarkAsRead);

    // console.log("messages list", messages);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollAreaRef.current && messages.length > 0) {
            const viewport = scrollAreaRef.current.viewport;
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }
    }, [messages.length]);

    // Mark conversation as read when messages are loaded
    useEffect(() => {
        if (selectedConversation && messages.length > 0) {
            markConversationAsRead();
        }
    }, [selectedConversation, messages.length, markConversationAsRead]);

    // Handle scroll to load more messages
    const handleScroll = (scrollPosition) => {
        // Mantine's onScrollPositionChange provides { x, y } not event.target
        // We need to get scroll info from the viewport ref
        if (!scrollAreaRef.current?.viewport) return;
        
        const viewport = scrollAreaRef.current.viewport;
        const scrollTop = viewport.scrollTop || scrollPosition?.y || 0;
        const scrollHeight = viewport.scrollHeight || 0;
        const clientHeight = viewport.clientHeight || 0;
        
        // Load more when scrolled to top (within 50px tolerance for smooth scrolling)
        if (scrollTop <= 50 && hasMoreMessages && !loadingMore) {
            loadMoreMessages();
        }
    };

    if (!selectedConversation) {
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

    if (loading && messages.length === 0) {
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
                <Center>
                    <Loader size="md" color="teal" />
                </Center>
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                p="xl"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                <Text color="red" mb="md">{error}</Text>
                <Button onClick={clearError} variant="outline" color="red">
                    Retry
                </Button>
            </Box>
        );
    }

    return (
        <ChatWindow
            conversation={selectedConversation}
            messages={messages}
            onSend={sendMessage}
            showDocumentView={showDocumentView}
            setShowDocumentView={setShowDocumentView}
            onlineUsers={onlineUsers}
            loadingMore={loadingMore}
            hasMoreMessages={hasMoreMessages}
            onLoadMore={loadMoreMessages}
            onScroll={handleScroll}
            scrollAreaRef={scrollAreaRef}
            sendingMessages={sendingMessages}
            acknowledgeMessage={acknowledgeMessage}
        />
    );
};

export default ChatArea;
