import React, { useEffect, useRef, memo, useMemo } from "react";
import { Box, ScrollArea, Button, Text } from "@mantine/core";
import MessageBubble from "./MessageBubble";
import DocumentView from "./DocumentView";
import { MESSAGE_TYPES } from "../../../shared/enums/messageTypesEnum";

const ChatMessages = memo(
    ({
        messages,
        userId,
        hasMoreMessages,
        loadingMore,
        onLoadMore,
        onScroll,
        scrollAreaRef,
        showDocumentView,
        setShowDocumentView,
        onSend,
        acknowledgeMessage,
    }) => {
        const viewportRef = useRef(null);

        useEffect(() => {
            if (!viewportRef.current) return;
            viewportRef.current.scrollTo({
                top: viewportRef.current.scrollHeight,
                behavior: "smooth",
            });
        }, [messages?.length]);

        const content = useMemo(() => {
            if (!messages?.length) {
                return (
                    <Text align="center" color="dimmed" p="xl">
                        No messages yet. Start a conversation!
                    </Text>
                );
            }

            return messages.map((m) => {
                const messageType = m.type || m.messageType;
                const isDocument =
                    messageType === MESSAGE_TYPES.DOCUMENT || messageType === "DOCUMENT";
                const isSender = m.senderId === userId;

                if (
                    isDocument &&
                    !isSender &&
                    m.json_data?.acknowledged !== true
                ) {
                    return (
                        <DocumentView
                            key={m.id}
                            message={m}
                            onClose={() => {
                                // DocumentView will be hidden once message is acknowledged
                                // No action needed here as the condition will prevent re-rendering
                            }}
                            onSend={onSend}
                            acknowledgeMessage={acknowledgeMessage}
                            offeringId={m.json_data?.offering_id}
                        />
                    );
                }

                return (
                    <MessageBubble
                        key={m.id}
                        message={m}
                        onViewDocument={() => setShowDocumentView(true)}
                    />
                );
            });
        }, [
            messages,
            showDocumentView,
            setShowDocumentView,
            onSend,
            acknowledgeMessage,
            userId,
        ]);

        return (
            <ScrollArea
                style={{ flexGrow: 1, padding: 20 }}
                scrollbarSize={8}
                px={60}
                offsetScrollbars
                type="auto"
                viewportRef={viewportRef}
                ref={scrollAreaRef}
                onScrollPositionChange={onScroll}
            >
                {hasMoreMessages && (
                    <Box mb="md" style={{ textAlign: "center" }}>
                        <Button
                            variant="subtle"
                            size="sm"
                            loading={loadingMore}
                            onClick={onLoadMore}
                            disabled={loadingMore}
                        >
                            {loadingMore ? "Loading..." : "Load More Messages"}
                        </Button>
                    </Box>
                )}
                {content}
            </ScrollArea>
        );
    }
);

export default ChatMessages;
