import { Box, Divider, ScrollArea } from "@mantine/core";
import { useEffect, useMemo } from "react";
import ContactItem from "./ContactItem";
import { theme } from "../../../shared/styles/theme/customTheme";


const ContactList = ({
    conversations = [],
    selectedConversation,
    onSelectConversation,
    onlineUsers = [],
    searchQuery = ""
}) => {

    const filteredConversations = useMemo(() => {
        if (!searchQuery.trim()) return conversations;
        const query = searchQuery.toLowerCase();
        return conversations.filter(
            (conversation) =>
                conversation.title?.toLowerCase().includes(query) ||
                // Search in participant names
                (conversation.participants || conversation.users || []).some(participant => {
                    const user = participant.user || participant;
                    return user.username?.toLowerCase().includes(query);
                }) ||
                // Search in last message content
                (conversation.lastMessage && 
                    (typeof conversation.lastMessage === 'string' 
                        ? conversation.lastMessage.toLowerCase().includes(query)
                        : conversation.lastMessage.content?.toLowerCase().includes(query)))
        );
    }, [conversations, searchQuery]);

    useEffect(() => {
        // console.log('ContactList received conversations:', conversations);
        // console.log('Conversations count:', conversations.length);
        // console.log('Search query:', searchQuery);
        // console.log('Filtered conversations:', filteredConversations.length);
    }, [conversations, searchQuery, filteredConversations]);

    return (
        <Box style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Divider color={theme.colors.inputBgColor[0]} size={"sm"} />
            <ScrollArea
                offsetScrollbars
                scrollbarSize={8}
                type="auto"
                style={{ flex: 1 }}
            >
                <Box p="xs">
                    {filteredConversations.map((conversation) => (
                        <ContactItem
                            key={conversation.id}
                            online={
                                conversation.type == 'DIRECT' && Array.isArray(onlineUsers)
                                    ? ((conversation.participants ?? conversation.users) || []).some(p => {
                                        // Handle nested structure: {user: {id}} or flat structure: {id}
                                        const participantId = p.user ? p.user.id : p.id;
                                        return onlineUsers.some(u => (u.userId ?? u.id) === participantId);
                                      })
                                    : false
                              }
                            conversation={conversation}
                            selected={selectedConversation?.id === conversation.id}
                            onSelect={onSelectConversation}
                        />
                    ))}
                </Box>
            </ScrollArea>
        </Box>
    )
}

export default ContactList;