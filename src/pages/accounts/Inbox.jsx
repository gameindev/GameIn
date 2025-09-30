import { useState, useEffect } from 'react';
import { Text, Grid, TextInput, Button, Avatar, Group, Box, ScrollArea, Paper, ActionIcon, Tooltip, Badge, Transition } from "@mantine/core";
import { IconSearch, IconSend, IconPaperclip, IconDotsVertical, IconEdit, IconCheck, IconX, IconMicrophone, IconPhoto, IconMoodSmile } from '@tabler/icons-react';
import StatBox from './../../components/shared/ui/StatBox';

export default function Inbox() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDocumentView, setShowDocumentView] = useState(false);

  // Mock data for contacts
  useEffect(() => {
    const mockContacts = [
      { id: 1, name: 'NVIDIA', avatar: null, lastMessage: 'Lorem ipsum dolor sit amet', unread: true, online: true },
      { id: 2, name: 'Brand123', avatar: null, lastMessage: 'Lorem ipsum', unread: true, online: false },
      { id: 3, name: 'Lorem Ipsum', avatar: null, lastMessage: 'consectetur adipiscing elit', unread: false, online: true },
      { id: 4, name: 'consectetuer', avatar: null, lastMessage: 'adipiscing elit', unread: false, online: false },
      { id: 5, name: 'adipiscing elit', avatar: null, lastMessage: 'sed diam nonummy', unread: false, online: false },
      { id: 6, name: 'sed diam nonummy', avatar: null, lastMessage: 'nibh euismod tincidunt', unread: false, online: true },
      { id: 7, name: 'nibh euismod tincidunt', avatar: null, lastMessage: 'ut laoreet dolore', unread: false, online: false },
      { id: 8, name: 'Instant Shock', avatar: null, lastMessage: 'magna aliquam', unread: true, online: true },
    ];
    setContacts(mockContacts);
    setSelectedContact(mockContacts[0]);
  }, []);

  // Mock data for messages when a contact is selected
  useEffect(() => {
    if (selectedContact) {
      const mockMessages = [
        {
          id: 1,
          sender: 'NVIDIA',
          isBot: true,
          content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna',
          timestamp: '27/04/2022 9:30 am'
        },
        {
          id: 2,
          sender: 'Instant Shock',
          isBot: false,
          content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore',
          timestamp: '27/05/2022 7:30 am'
        },
        {
          id: 3,
          sender: 'NVIDIA',
          isBot: true,
          content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna',
          timestamp: '27/05/2022 7:35 am'
        }
      ];
      setMessages(mockMessages);
    }
  }, [selectedContact]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: 'You',
      isBot: false,
      content: newMessage,
      timestamp: new Date().toLocaleString()
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        sender: selectedContact.name,
        isBot: true,
        content: 'Thank you for your message. This is an automated response.',
        timestamp: new Date().toLocaleString()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <Grid gutter={0} style={{ height: 'calc(100vh - 100px)', overflow: 'hidden' }}>
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
            {filteredContacts.map(contact => (
              <Box
                key={contact.id}
                p="sm"
                mb="xs"
                style={{
                  backgroundColor: selectedContact?.id === contact.id ? '#343A40' : 'transparent',
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
                        color={contact.online ? 'teal' : 'gray'} 
                        radius="xl"
                        styles={{ 
                          root: { 
                            border: contact.unread ? '2px solid #20C997' : 'none',
                          }
                        }}
                      >
                        {contact.name.charAt(0)}
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
                        <Text weight={contact.unread ? 700 : 400} color="#E9ECEF" size="sm">{contact.name}</Text>
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
        {selectedContact ? (
          <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Chat header */}
            <Box p="md" style={{ backgroundColor: '#212529', borderBottom: '1px solid #343A40' }}>
              <Group position="apart">
                <Group>
                  <Box style={{ position: 'relative' }}>
                    <Avatar color={selectedContact.online ? 'teal' : 'gray'} radius="xl">
                      {selectedContact.name.charAt(0)}
                    </Avatar>
                    {selectedContact.online && (
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
                    <Text weight={600} color="#E9ECEF">{selectedContact.name}</Text>
                    <Text size="xs" color={selectedContact.online ? '#20C997' : '#ADB5BD'}>
                      {selectedContact.online ? 'Online' : 'Offline'}
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
            
            {/* Messages area */}
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
            
            {/* Message input area */}
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
            </Box>
          </Box>
        ) : (
          <Box p="xl" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Text color="#ADB5BD">Select a conversation to start chatting</Text>
          </Box>
        )}
      </Grid.Col>
    </Grid>
  );
}
