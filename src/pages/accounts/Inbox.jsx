import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    ActionIcon,
    Avatar,
    Badge,
    Box,
    Divider,
    Group,
    Paper,
    ScrollArea,
    Stack,
    Text,
    TextInput,
    Textarea,
    UnstyledButton,
    rem,
    useMantineTheme,
} from '@mantine/core';
import { IconDots, IconMicrophone, IconMoodSmile, IconPhoto, IconSearch, IconSend } from '@tabler/icons-react';



function PreviewItem({ active, name, message, time, unread, avatar, onClick }) {
    const theme = useMantineTheme();
    return (
        <UnstyledButton
            onClick={onClick}
            style={{
                width: '100%',
                borderRadius: rem(8),
                background: active
                    ? theme.colorScheme === 'dark'
                        ? theme.colors.dark[6]
                        : theme.colors.gray[1]
                    : 'transparent',
                padding: rem(10),
            }}
        >
            <Group wrap="nowrap" align="flex-start" gap="sm">
                <Avatar radius="xl" src={avatar} alt={name} />
                <Box style={{ flex: 1, minWidth: 0 }}>
                    <Group justify="space-between" gap={4} wrap="nowrap">
                        <Text fw={600} size="sm" lineClamp={1}>
                            {name}
                        </Text>
                        <Text size="xs" c="dimmed">{time}</Text>
                    </Group>
                    <Group justify="space-between" gap={8} wrap="nowrap">
                        <Text size="xs" c="dimmed" lineClamp={1} style={{ flex: 1, minWidth: 0 }}>
                            {message}
                        </Text>
                        {unread > 0 && (
                            <Badge size="xs" variant="filled" color="blue">
                                {unread}
                            </Badge>
                        )}
                    </Group>
                </Box>
            </Group>
        </UnstyledButton>
    );
}

function ChatBubble({ mine, text, time, name, avatar }) {
    const theme = useMantineTheme();
    const mineBg = theme.colorScheme === 'dark' ? theme.colors.blue[7] : theme.colors.blue[5];
    const otherBg = theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1];

    return (
        <Group justify={mine ? 'flex-end' : 'flex-start'} wrap="nowrap">
            {!mine && <Avatar radius="xl" size={28} src={avatar} alt={name} />}
            <Paper
                p="sm"
                radius="lg"
                style={{
                    maxWidth: '78%',
                    background: mine ? mineBg : otherBg,
                    color: mine ? theme.white : undefined,
                }}
            >
                {!mine && (
                    <Text size="xs" fw={600} c="dimmed" mb={4}>
                        {name}
                    </Text>
                )}
                <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>
                    {text}
                </Text>
                <Text size="xs" c={mine ? theme.white : 'dimmed'} mt={4} ta={mine ? 'right' : 'left'}>
                    {time}
                </Text>
            </Paper>
            {mine && <Avatar radius="xl" size={28} src={avatar} alt={name} style={{ opacity: 0 }} />}
        </Group>
    );
}

export default function Inbox() {
    const theme = useMantineTheme();

    const initialThreads = useMemo(
        () => [
            {
                id: 'alice',
                name: 'Alice Johnson',
                avatar: 'https://i.pravatar.cc/100?img=1',
                unread: 2,
                messages: [
                    { id: 'm1', from: 'alice', text: 'Hey! Are you free to play later?', time: '09:24' },
                    { id: 'm2', from: 'me', text: "Yeah! 8pm works. Let's team up.", time: '09:26' },
                    { id: 'm3', from: 'alice', text: 'Great, see you then! 🕗', time: '09:27' },
                ],
            },
            {
                id: 'squad',
                name: 'Squad Chat',
                avatar: 'https://i.pravatar.cc/100?img=15',
                unread: 0,
                messages: [
                    { id: 'm4', from: 'me', text: 'GGs last night everyone!', time: 'Yesterday' },
                    { id: 'm5', from: 'sam', text: 'Let’s push to diamond this weekend.', time: 'Yesterday' },
                ],
            },
            {
                id: 'devs',
                name: 'Dev Team',
                avatar: 'https://i.pravatar.cc/100?img=5',
                unread: 1,
                messages: [
                    { id: 'm6', from: 'kate', text: 'Shipped the lobby patch. 🚀', time: 'Mon' },
                    { id: 'm7', from: 'me', text: 'Nice! I’ll update the changelog.', time: 'Mon' },
                ],
            },
        ],
        []
    );

    const [threads, setThreads] = useState(initialThreads);
    const [activeId, setActiveId] = useState(initialThreads[0]?.id || null);
    const [query, setQuery] = useState('');
    const [draft, setDraft] = useState('');
    const endRef = useRef(null);

    const activeThread = useMemo(
        () => threads.find((t) => t.id === activeId) || threads[0],
        [threads, activeId]
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return threads;
        return threads.filter((t) => t.name.toLowerCase().includes(q));
    }, [query, threads]);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [activeThread?.messages?.length, activeId]);

    const send = () => {
        const text = draft.trim();
        if (!text || !activeThread) return;
        setThreads((prev) =>
            prev.map((t) =>
                t.id === activeThread.id
                    ? {
                        ...t,
                        messages: [
                            ...t.messages,
                            { id: `${t.id}-${Date.now()}`, from: 'me', text, time: 'Now' },
                        ],
                        unread: 0,
                    }
                    : t
            )
        );
        setDraft('');
        // Optional quick auto-reply simulation for demo UX
        // setTimeout(() => {
        //   setThreads((prev) => prev.map((t) => t.id === activeThread.id ? { ...t, messages: [...t.messages, { id: `${t.id}-r${Date.now()}`, from: activeThread.id, text: '👍', time: 'Now' }]} : t));
        // }, 600);
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };

    return (
        <Box px="md" py="sm" style={{ height: '80vh' }}>
            <Paper withBorder radius="md" style={{ height: '100%', overflow: 'hidden' }}>
                <Group align="stretch" gap={0} style={{ height: '100%' }}>
                    {/* Sidebar */}
                    <Box
                        w={320}
                        style={{
                            borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3]}`,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Box p="md">
                            <Group justify="space-between">
                                <Text fw={700}>Inbox</Text>
                                <ActionIcon variant="subtle" color="gray">
                                    <IconDots size={18} />
                                </ActionIcon>
                            </Group>
                            <TextInput
                                mt="sm"
                                placeholder="Search"
                                value={query}
                                onChange={(e) => setQuery(e.currentTarget.value)}
                                leftSection={<IconSearch size={16} />}
                            />
                        </Box>

                        <Divider />
                        <ScrollArea style={{ flex: 1 }}>
                            <Stack p="sm" gap={4}>
                                {filtered.map((t) => (
                                    <PreviewItem
                                        key={t.id}
                                        active={t.id === activeId}
                                        name={t.name}
                                        message={t.messages[t.messages.length - 1]?.text}
                                        time={t.messages[t.messages.length - 1]?.time}
                                        unread={t.unread}
                                        avatar={t.avatar}
                                        onClick={() => setActiveId(t.id)}
                                    />
                                ))}
                                {filtered.length === 0 && (
                                    <Text c="dimmed" ta="center" py="md">
                                        No conversations
                                    </Text>
                                )}
                            </Stack>
                        </ScrollArea>
                    </Box>

                    {/* Conversation */}
                    <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                        <Group p="md" justify="space-between" style={{ borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3]}` }}>
                            <Group gap="sm">
                                <Avatar radius="xl" src={activeThread?.avatar} alt={activeThread?.name} />
                                <Stack gap={0}>
                                    <Text fw={700}>{activeThread?.name}</Text>
                                    <Text size="xs" c="dimmed">Online</Text>
                                </Stack>
                            </Group>
                            <Group gap="xs">
                                <ActionIcon variant="subtle" color="gray">
                                    <IconPhoto size={18} />
                                </ActionIcon>
                                <ActionIcon variant="subtle" color="gray">
                                    <IconMicrophone size={18} />
                                </ActionIcon>
                                <ActionIcon variant="subtle" color="gray">
                                    <IconMoodSmile size={18} />
                                </ActionIcon>
                            </Group>
                        </Group>

                        <ScrollArea style={{ flex: 1 }} px="md" py="sm">
                            <Stack gap="sm">
                                {activeThread?.messages?.map((m) => (
                                    <ChatBubble
                                        key={m.id}
                                        mine={m.from === 'me'}
                                        text={m.text}
                                        time={m.time}
                                        name={m.from === 'me' ? 'You' : activeThread.name}
                                        avatar={m.from === 'me' ? undefined : activeThread.avatar}
                                    />
                                ))}
                                <div ref={endRef} />
                            </Stack>
                        </ScrollArea>

                        <Box p="md" style={{ borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3]}` }}>
                            <Group align="flex-end">
                                <Textarea
                                    autosize
                                    minRows={1}
                                    maxRows={4}
                                    placeholder="Type a message..."
                                    style={{ flex: 1 }}
                                    value={draft}
                                    onChange={(e) => setDraft(e.currentTarget.value)}
                                    onKeyDown={onKeyDown}
                                />
                                <ActionIcon
                                    size="lg"
                                    radius="xl"
                                    color="blue"
                                    variant={draft.trim() ? 'filled' : 'light'}
                                    onClick={send}
                                >
                                    <IconSend size={18} />
                                </ActionIcon>
                            </Group>
                        </Box>
                    </Box>
                </Group>
            </Paper>
        </Box>
    );
}

