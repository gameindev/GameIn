import { Grid } from "@mantine/core";
import { theme } from "../../../shared/styles/theme/customTheme";
import { useAppSelector } from "../../../app/store/hooks";
import { currentUser } from "../../auth/store/selector";
import { useConversationManagement } from "../hooks/useConversationManagement";
import { useSocketManagement } from "../hooks/useSocketManagement";
import ConversationSidebar from "../components/ConversationSidebar";
import ChatArea from "../components/ChatArea";
import ChatConfirmModal from "../components/ChatConfirmModal";
import { useSearchParams, useParams, useNavigate } from "react-router";
import routePaths from "../../../app/router/routes";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Inbox = () => {
    const user = useAppSelector(currentUser);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { conversationId: conversationIdFromRoute } = useParams();
    const conversationIdParam = conversationIdFromRoute || searchParams.get('conversationId');
    const [mobileChatOpen, setMobileChatOpen] = useState(Boolean(conversationIdParam));
    
    const {
        conversations,
        selectedConversation,
        conversationsLoading,
        handleSelectConversation,
        handleCreateChat,
        handleNewMessage,
        markConversationAsRead,
        handleMarkAllRead,
        handleClearChat,
        handleDeleteConversation,
        handleTogglePin,
        pendingConfirm,
        confirmLoading,
        cancelPendingConfirm,
        confirmPendingAction,
    } = useConversationManagement(user);

    const { onlineUsers } = useSocketManagement(user, conversations, handleNewMessage);

    const handleConfirmAction = async () => {
        const deletedConversationId = await confirmPendingAction();
        if (
            deletedConversationId &&
            Number(conversationIdParam) === deletedConversationId
        ) {
            navigate(routePaths.ACCOUNTS.INBOX.ROOT);
        }
    };


    useEffect(() => {
        if (conversationIdParam && conversations.length > 0 && !conversationsLoading) {
            const conversationToSelect = conversations.find(
                conv => conv.id === Number(conversationIdParam)
            );
            
            if (conversationToSelect && (!selectedConversation || selectedConversation.id !== conversationToSelect.id)) {
                handleSelectConversation(conversationToSelect);
            }
            if (conversationToSelect) {
                setMobileChatOpen(true);
            }
        }
    }, [conversationIdParam, conversations, conversationsLoading, selectedConversation, handleSelectConversation]);

    

    return (
        <InboxShell
            className={mobileChatOpen && selectedConversation ? "chat-open" : ""}
            gutter={0}
            style={{ height: "calc(100vh)", overflow: "hidden" }}
            styles={{
                inner: {
                    height: "100%",
                    justifyContent: "space-between",
                },
            }}
        >
            {/* Sidebar */}
            <Grid.Col
                className="inbox-sidebar-pane"
                span={3.8}
                style={{
                    borderRight: "1px solid #343A40",
                    backgroundColor: theme.colors.secondaryGrey[0],
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    borderRadius: theme.radius.md,
                }}
            >
                <ConversationSidebar
                    conversations={conversations}
                    selectedConversation={selectedConversation}
                    conversationsLoading={conversationsLoading}
                    onlineUsers={onlineUsers}
                    onSelectConversation={(conv) => {
                        handleSelectConversation(conv);
                        setMobileChatOpen(true);
                        if (conv?.id) {
                            navigate(
                                routePaths.ACCOUNTS.INBOX.CONVERSATION.replace(
                                    ':conversationId',
                                    conv.id
                                )
                            );
                        }
                    }}
                    onCreateChat={handleCreateChat}
                    user={user}
                    onMarkAllRead={handleMarkAllRead}
                    onClearChat={handleClearChat}
                    onDeleteConversation={handleDeleteConversation}
                    onTogglePin={handleTogglePin}
                />
            </Grid.Col>

            <ChatConfirmModal
                opened={Boolean(pendingConfirm)}
                type={pendingConfirm?.type}
                conversationLabel={pendingConfirm?.conversationLabel}
                loading={confirmLoading}
                onClose={cancelPendingConfirm}
                onConfirm={handleConfirmAction}
            />

            {/* Chat Area */}
            <Grid.Col
                className="inbox-chat-pane"
                span={8}
                style={{
                    height: "100%",
                    backgroundColor: theme.colors.secondaryGrey[0],
                    overflow: "hidden",
                    borderRadius: theme.radius.md,
                }}
            >
                <ChatArea 
                    selectedConversation={selectedConversation} 
                    onlineUsers={onlineUsers}
                    onMarkAsRead={markConversationAsRead}
                    onBack={() => {
                        setMobileChatOpen(false);
                        navigate(routePaths.ACCOUNTS.INBOX.ROOT);
                    }}
                    showBack={mobileChatOpen}
                />
            </Grid.Col>
        </InboxShell>
    );
};

const InboxShell = styled(Grid)`
    min-height: 34rem;

    .inbox-sidebar-pane,
    .inbox-chat-pane {
        min-width: 0;
    }

    .inbox-back-btn {
        display: none;
    }

    @media (max-width: 768px) {
        height: calc(100dvh - 6.5rem) !important;
        min-height: 30rem;
        border-radius: ${theme.radius.md};
        overflow: hidden;
        background: ${theme.colors.secondaryGrey[0]};

        .mantine-Grid-inner {
            transform: translateX(0);
            transition: transform 0.26s cubic-bezier(.4, 0, .2, 1);
            width: 200%;
            flex-wrap: nowrap;
        }

        &.chat-open .mantine-Grid-inner {
            transform: translateX(-50%);
        }

        .inbox-sidebar-pane,
        .inbox-chat-pane {
            flex: 0 0 50% !important;
            max-width: 50% !important;
            width: 50% !important;
            height: 100% !important;
            border-radius: ${theme.radius.md} !important;
        }

        .inbox-sidebar-pane {
            border-right: 0 !important;
        }

        .inbox-back-btn {
            display: inline-flex;
        }

        .chat-window {
            min-width: 0;
            background: ${theme.colors.secondaryGrey[0]};
        }

        .chat-header {
            padding: 0.9rem 1rem !important;
        }

        .chat-header .mantine-Group-root {
            min-width: 0;
        }

        .chat-header .mantine-Text-root {
            max-width: 12rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .chat-messages {
            padding: 0.85rem !important;
            padding-left: 0.85rem !important;
            padding-right: 0.85rem !important;
        }

        .message-item,
        .document-message {
            margin-bottom: 1rem !important;
            min-width: 0;
        }

        .message-body-offset,
        .document-message-offset {
            padding-left: 0 !important;
            min-width: 0;
        }

        .message-body-offset > .mantine-Box-root {
            padding: 0.8rem !important;
            border-radius: ${theme.radius.md} !important;
        }

        .document-message-card {
            padding: 1rem !important;
            min-width: 0;
        }

        .document-message-content {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.9rem !important;
        }

        .document-message-content > .mantine-Group-root:first-child {
            justify-content: flex-start !important;
        }

        .document-message-content > .mantine-Group-root:first-child .mantine-Flex-root {
            width: 6.25rem !important;
            min-height: 6.25rem;
        }

        .document-message-copy {
            align-items: flex-start !important;
            gap: 0.7rem !important;
            width: 100%;
        }

        .document-message-copy .mantine-Text-root {
            line-height: 1.3;
        }

        .document-message-actions {
            width: 100%;
            justify-content: flex-start !important;
            gap: 0.85rem !important;
            flex-wrap: wrap;
        }

        .chat-input {
            padding: 0.85rem 1rem 1rem !important;
        }

        .chat-input .mantine-Textarea-root,
        .chat-input .mantine-Textarea-wrapper,
        .chat-input textarea {
            width: 100%;
        }

        .chat-input textarea {
            min-height: 3rem;
            border-radius: ${theme.radius.md} !important;
        }

        .chat-input .mantine-Group-root:last-child {
            margin-top: 0.75rem !important;
        }
    }
`;

export default Inbox;
