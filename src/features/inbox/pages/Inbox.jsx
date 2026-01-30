import { Grid } from "@mantine/core";
import { theme } from "../../../shared/styles/theme/customTheme";
import { useAppSelector } from "../../../app/store/hooks";
import { currentUser } from "../../auth/store/selector";
import { useConversationManagement } from "../hooks/useConversationManagement";
import { useSocketManagement } from "../hooks/useSocketManagement";
import ConversationSidebar from "../components/ConversationSidebar";
import ChatArea from "../components/ChatArea";
import { useSearchParams, useParams, useNavigate } from "react-router";
import routePaths from "../../../app/router/routes";
import { useEffect } from "react";

const Inbox = () => {
    const user = useAppSelector(currentUser);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { conversationId: conversationIdFromRoute } = useParams();
    const conversationIdParam = conversationIdFromRoute || searchParams.get('conversationId');
    
    const {
        conversations,
        selectedConversation,
        conversationsLoading,
        handleSelectConversation,
        handleCreateChat,
        handleNewMessage,
        markConversationAsRead,
    } = useConversationManagement(user);

    const { onlineUsers } = useSocketManagement(user, conversations, handleNewMessage);


    useEffect(() => {
        if (conversationIdParam && conversations.length > 0 && !conversationsLoading) {
            const conversationToSelect = conversations.find(
                conv => conv.id === Number(conversationIdParam)
            );
            
            if (conversationToSelect && (!selectedConversation || selectedConversation.id !== conversationToSelect.id)) {
                handleSelectConversation(conversationToSelect);
            }
        }
    }, [conversationIdParam, conversations, conversationsLoading, selectedConversation, handleSelectConversation]);

    

    return (
        <Grid
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
                    onMarkAsRead={markConversationAsRead}
                />
            </Grid.Col>

            {/* Chat Area */}
            <Grid.Col
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
                />
            </Grid.Col>
        </Grid>
    );
};

export default Inbox;
