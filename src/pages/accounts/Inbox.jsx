/* eslint-disable */
import { useState, useEffect } from 'react';
import { Text, Grid, TextInput, Button, Avatar, Group, Box, ScrollArea, Paper, ActionIcon, Tooltip, Badge, Transition, Space, MultiSelect, Select } from "@mantine/core";
import { IconSearch, IconSend, IconPaperclip, IconDotsVertical, IconEdit, IconCheck, IconX, IconMicrophone, IconPhoto, IconMoodSmile } from '@tabler/icons-react';
import StatBox from './../../components/shared/ui/StatBox';
import { useOutletContext } from 'react-router';
import useApi from '../../hooks/useApi';
import { useInboxApi } from '../inbox/inboxApi';

export default function Inbox() {
    const { fetchFriends, createConversation, getAllConversation } = useInboxApi();
    const { userProfile, isSelf } = useOutletContext();

    const [friends, setFriends] = useState([]);
    const [contacts, setContacts] = useState([]);

    const [selectedContact, setSelectedContact] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [messages, setMessages] = useState([]);
    const [showDocumentView, setShowDocumentView] = useState(false);

   

    useEffect(() => {
        const loadFriends = async () => {
            if (!userProfile.id) return;

            try {
                let response;
                if (userProfile.id) {
                    response = await fetchFriends(userProfile.id);
                    setFriends(response);
                    // setSelectedContact(response[0]);

                }
            } catch (err) {
                console.error("Error fetching friends:", err);
            }
        };

        const loadAllConversastion = async () => {
            if (!userProfile.id) return;

            try {
                let response;
                if (userProfile.id) {
                    response = await getAllConversation(userProfile.id);
                    setConversations(response);
                }
            } catch (err) {
                console.error("Error fetching friends:", err);
            }

        }

        loadFriends();
        loadAllConversastion();
    }, [userProfile.id]);

    // console.log("fetched conversations",conversations)

    const handleStartConversation = async (val) => {       
        const contact = friends.filter(friend => friend.username === val)    

        try {
            const conversation = await createConversation({
                "participant_ids": [isSelf.id, contact[0].id],
                "type": "DIRECT"
            })

            if (conversation == null || conversation == undefined) {
                alert("Failed to add new conversation")
            }

        } catch (err) {
            console.error("Error Creating Conversation:", err);
        }
    };

    // Mock data for messages when a contact is selected

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        // const newMsg = {
        //     id: messages.length + 1,
        //     sender: 'You',
        //     isBot: false,
        //     content: newMessage,
        //     timestamp: new Date().toLocaleString()
        // };

        // setMessages([...messages, newMsg]);
        // setNewMessage('');

        // // Simulate bot response after a short delay
        // setTimeout(() => {
        //     const botResponse = {
        //         id: messages.length + 2,
        //         sender: selectedContact.name,
        //         isBot: true,
        //         content: 'Thank you for your message. This is an automated response.',
        //         timestamp: new Date().toLocaleString()
        //     };
        //     setMessages(prev => [...prev, botResponse]);
        // }, 1000);
    };

    const remappedConversations = [];
    conversations.map((conv, i) => {        
        const conversationReceiver = conv?.participants?.filter(u => u.user_id !== userProfile?.id)
        // Find the particular user (receiver) from friends matching the user_id of the conversation receiver
        const receiverUserId = conversationReceiver && conversationReceiver.length > 0 ? conversationReceiver[0].user_id : null;
        const receiver = friends.find(u => u.id === receiverUserId);
        remappedConversations.push({conversation_id: conv.id, receiver: receiver})
    })

    
    const filteredConversations = remappedConversations.filter(({ receiver }) => {
        if (!receiver) return false;
        return receiver.username?.toLowerCase().includes(searchQuery.toLowerCase());
    });


    console.log(filteredConversations)

    const DocumentView = () => (
        <Paper p="md" shadow="md" radius="md" style={{ backgroundColor: '#2C2E33', color: 'white', marginBottom: '20px' }}>
            <Group position="apart" mb="xs">
                <Group spacing={8}>
                    <IconEdit size={16} color="#4DABF7" />
                    <Text size="sm" weight={500} color="#E9ECEF">view / edit document</Text>
                </Group>
                <ActionIcon size="sm" variant="subtle" color="gray" onClick={() => setShowDocumentView(false)}>
                    <IconX size={16} />
                </ActionIcon>
            </Group>
            <Text size="sm" color="#CED4DA" my="md">Do you accept changes made by sponsor to your Lorem ipsum dolor sit amet, consectetuer and activate the deal?</Text>
            <Group position="right" mt="md" spacing="xs">
                <Button size="xs" variant="filled" color="teal" leftIcon={<IconCheck size={14} />} radius="md">
                    accept
                </Button>
                <Button size="xs" variant="outline" color="red" leftIcon={<IconX size={14} />} radius="md">
                    decline
                </Button>
            </Group>
        </Paper>
    );

    return (
        <Grid gutter={0} style={{ overflow: 'hidden' }}>
            {/* Left sidebar with contacts */}
            <Grid.Col span={4} style={{ borderRight: '1px solid #343A40', backgroundColor: '#212529' }}>
                <Box p="md">
                    <Text weight={700} size="lg" mb="md" color="#E9ECEF">message center</Text>
                    <TextInput
                        placeholder="Search contacts"
                        icon={<IconSearch size={16} color="#ADB5BD" />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        mb="md"
                        styles={{
                            input: {
                                backgroundColor: '#343A40',
                                color: '#E9ECEF',
                                border: 'none',
                                '&::placeholder': { color: '#6C757D' }
                            }
                        }}
                        radius="md"
                    />
                    <ScrollArea style={{ height: 'calc(100vh - 200px)' }} scrollbarSize={6}>
                        {filteredConversations.map(contact => (
                            <Box
                                key={contact.conversation_id}
                                p="sm"
                                mb="xs"
                                style={{
                                    backgroundColor: selectedContact?.conversation_id === contact.conversation_id ? '#343A40' : 'transparent',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                                onClick={() => setSelectedContact(contact)}
                            >
                                <Group position="apart">
                                    <Group>
                                        <Box style={{ position: 'relative' }}>
                                            <Avatar
                                                // color={contact.online ? 'teal' : 'gray'}
                                                color={'gray'}
                                                radius="xl"
                                                styles={{
                                                    root: {
                                                        // border: contact.unread ? '2px solid #20C997' : 'none',
                                                        border: 'none',
                                                    }
                                                }}
                                            >
                                            </Avatar>
                                            {contact.online && (
                                                <Box
                                                    style={{
                                                        position: 'absolute',
                                                        bottom: 0,
                                                        right: 0,
                                                        width: '10px',
                                                        height: '10px',
                                                        backgroundColor: '#20C997',
                                                        borderRadius: '50%',
                                                        border: '2px solid #212529'
                                                    }}
                                                />
                                            )}
                                        </Box>
                                        <Box style={{ flex: 1 }}>
                                            <Group position="apart">
                                                <Text weight={contact.unread ? 700 : 400} color="#E9ECEF" size="sm">{contact.receiver.username}</Text>
                                                {contact.unread && <Badge size="xs" color="teal" variant="filled" radius="xl">new</Badge>}
                                            </Group>
                                            <Text size="xs" color="#ADB5BD" lineClamp={1} mt={4}>
                                                {contact.lastMessage}
                                            </Text>
                                        </Box>
                                    </Group>
                                </Group>
                            </Box>
                        ))}
                    </ScrollArea>
                </Box>
            </Grid.Col>

            {/* Right chat area */}
            <Grid.Col span={8} style={{ backgroundColor: '#2C2E33' }}>
                {conversations.length > 0 ? (
                    <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        
                        {/* <Box p="md" style={{ backgroundColor: '#212529', borderBottom: '1px solid #343A40' }}>
                            <Group position="apart">
                                <Group>
                                    <Box style={{ position: 'relative' }}>
                                        <Avatar color={conversationContacts[0].online ? 'teal' : 'gray'} radius="xl">
                                            {conversationContacts[0].username.charAt(0)}
                                        </Avatar>
                                        {conversationContacts[0].online && (
                                            <Box
                                                style={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    right: 0,
                                                    width: '10px',
                                                    height: '10px',
                                                    backgroundColor: '#20C997',
                                                    borderRadius: '50%',
                                                    border: '2px solid #212529'
                                                }}
                                            />
                                        )}
                                    </Box>
                                    <Box>
                                        <Text weight={600} color="#E9ECEF">{conversationContacts[0].username}</Text>
                                        <Text size="xs" color={conversationContacts[0].online ? '#20C997' : '#ADB5BD'}>
                                            {conversationContacts[0].online ? 'Online' : 'Offline'}
                                        </Text>
                                    </Box>
                                </Group>
                                <Group spacing={8}>
                                    <ActionIcon variant="subtle" color="gray" radius="xl">
                                        <IconPhoto size={18} />
                                    </ActionIcon>
                                    <ActionIcon variant="subtle" color="gray" radius="xl">
                                        <IconDotsVertical size={18} />
                                    </ActionIcon>
                                </Group>
                            </Group>
                        </Box>

                        
                        <ScrollArea
                            style={{ flex: 1, padding: '20px' }}
                            scrollbarSize={6}
                            styles={{ thumb: { backgroundColor: '#495057' } }}
                        >
                            <Transition mounted={showDocumentView} transition="slide-down" duration={300} timingFunction="ease">
                                {(styles) => <div style={styles}><DocumentView /></div>}
                            </Transition>

                            {messages.map(message => (
                                <Box
                                    key={message.id}
                                    mb="lg"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: message.isBot ? 'flex-start' : 'flex-end'
                                    }}
                                >
                                    <Group spacing="xs" mb={5}>
                                        {message.isBot && (
                                            <Avatar color={message.sender === 'NVIDIA' ? 'teal' : 'blue'} radius="xl" size="sm">
                                                {message.sender.charAt(0)}
                                            </Avatar>
                                        )}
                                        <Text size="xs" color="#ADB5BD">
                                            {message.sender} • {message.timestamp}
                                        </Text>
                                    </Group>

                                    <Paper
                                        p="md"
                                        shadow="sm"
                                        style={{
                                            backgroundColor: message.isBot ? '#343A40' : '#228BE6',
                                            color: message.isBot ? '#E9ECEF' : 'white',
                                            maxWidth: '70%',
                                            borderRadius: message.isBot ? '12px 12px 12px 0' : '12px 12px 0 12px',
                                        }}
                                    >
                                        <Text size="sm">{message.content}</Text>

                                        {message.id === 1 && (
                                            <Button
                                                variant="subtle"
                                                size="xs"
                                                leftIcon={<IconEdit size={14} />}
                                                onClick={() => setShowDocumentView(true)}
                                                mt="xs"
                                                color="cyan"
                                                styles={{
                                                    root: {
                                                        color: '#4DABF7',
                                                        '&:hover': { backgroundColor: 'rgba(77, 171, 247, 0.1)' }
                                                    }
                                                }}
                                            >
                                                view / edit document
                                            </Button>
                                        )}
                                    </Paper>
                                </Box>
                            ))}
                        </ScrollArea>

                        
                        <Box p="md" style={{ borderTop: '1px solid #343A40', backgroundColor: '#212529' }}>
                            <Group position="apart" spacing={8}>
                                <TextInput
                                    placeholder="Type your message here"
                                    style={{ flex: 1 }}
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') handleSendMessage();
                                    }}
                                    styles={{
                                        input: {
                                            backgroundColor: '#343A40',
                                            color: '#E9ECEF',
                                            border: 'none',
                                            '&::placeholder': { color: '#6C757D' }
                                        }
                                    }}
                                    radius="xl"
                                    rightSection={
                                        <Group spacing={8} mr={8}>
                                            <ActionIcon size="sm" variant="subtle" color="gray">
                                                <IconMoodSmile size={18} />
                                            </ActionIcon>
                                            <ActionIcon size="sm" variant="subtle" color="gray">
                                                <IconPaperclip size={18} />
                                            </ActionIcon>
                                        </Group>
                                    }
                                />
                                <Group spacing={8}>
                                    <ActionIcon size="lg" variant="subtle" color="gray" radius="xl">
                                        <IconMicrophone size={18} />
                                    </ActionIcon>
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={newMessage.trim() === ''}
                                        color="teal"
                                        radius="xl"
                                        styles={{
                                            root: {
                                                transition: 'all 0.2s ease',
                                                '&:hover': { transform: 'translateY(-2px)' }
                                            }
                                        }}
                                    >
                                        <IconSend size={16} />
                                    </Button>
                                </Group>
                            </Group>
                        </Box> */}
                    </Box>
                ) : (
                    <Box p="xl" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Text color="#ADB5BD">Select a conversation to start chatting</Text>
                        <Space h="md" />
                        <Select
                            label="Search contacts"
                            placeholder="Pick value"
                            data={friends?.map(u => u.username)}
                            onChange={(value) => handleStartConversation(value)}
                        />
                    </Box>
                )}
            </Grid.Col>

        </Grid>
    );
}
// setConversationContacts(contacts.filter(contact => contact.username === value))