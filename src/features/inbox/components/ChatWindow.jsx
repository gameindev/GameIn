import React, { useMemo, useCallback, useRef, useState, useEffect } from "react";
import {
    Box,
    Group,
    Text,
    ActionIcon,
    ScrollArea,
    TextInput,
    Button,
    Badge,
    Progress,
    Modal,
    Image,
    Tooltip,
    Divider,
    Textarea,
} from "@mantine/core";
import {
    IconPhoto,
    IconDotsVertical,
    IconMicrophone,
    IconPaperclip,
    IconMoodSmile,
    IconSend,
    IconFile,
    IconX,
    IconDownload,
} from "@tabler/icons-react";
import MessageBubble from "./MessageBubble";
import DocumentView from "./DocumentView";
import { theme } from "../../../shared/styles/theme/customTheme";
import HexContainer from "../../../shared/components/HexContainer";
import { useAppSelector } from "../../../app/store/hooks";
import { currentUser } from "../../auth/store/selector";
import { MESSAGE_TYPES } from "../../../shared/enums/messageTypesEnum";

const ChatWindow = ({
    conversation,
    messages = [],
    onSend,
    showDocumentView = false,
    setShowDocumentView,
    onlineUsers = [],
    loadingMore = false,
    hasMoreMessages = true,
    onLoadMore,
    onScroll,
    scrollAreaRef,
    sendingMessages = new Set(),
    acknowledgeMessage,
}) => {
    const [message, setMessage] = useState("");
    const [attachments, setAttachments] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);
    const viewportRef = useRef(null);
    const [displayName, setDisplayName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [online, setOnline] = useState(false);
    const user = useAppSelector(currentUser);
    console.log("messages", messages);
    // Extract participant info
    useEffect(() => {
        if (!conversation) return;

        // Handle both nested structure (API response) and flat structure (our enriched data)
        const participants = conversation?.participants || conversation?.users || [];
        const other = participants.find((p) => {
            // Handle nested structure: {user: {id, username, profilepic}}
            const participantId = p.user ? p.user.id : p.id;
            return participantId !== user.id;
        });

        // Extract user data from nested structure if needed
        const otherUser = other?.user || other;

        const nameFromTitle = typeof conversation?.title === "string" ? conversation.title.trim() : conversation?.title;
        const name = nameFromTitle ? nameFromTitle : (otherUser?.username || otherUser?.name);
        setDisplayName(name || "");

        const picPath = otherUser?.profilepic || otherUser?.profile_pic;
        let pic = null;
        if (picPath) {
            pic = picPath.startsWith("http")
                ? picPath
                : (import.meta.env.VITE_ASSET_URL
                    ? `${import.meta.env.VITE_ASSET_URL}/${picPath}`
                    : picPath);
        }
        setAvatarUrl(pic);
    }, [conversation, conversation?.participants, conversation?.users, conversation?.title, user.id]);

    // Check online status
    useEffect(() => {
        if (!conversation) {
            setOnline(false);
            return;
        }

        const isDirect = conversation.type === 'DIRECT';
        if (!isDirect || !Array.isArray(onlineUsers)) {
            setOnline(false);
            return;
        }

        const participants = (conversation.participants ?? conversation.users) || [];
        const isOnline = participants.some(p => {
            const participantId = p.user ? p.user.id : p.id;
            return participantId !== user.id && onlineUsers.some(u => (u.userId ?? u.id) === participantId);
        });
        setOnline(isOnline);
    }, [conversation, conversation?.participants, conversation?.users, conversation?.type, onlineUsers, user.id]);

    // Auto-show DocumentView when there's a document message
    useEffect(() => {
        if (!messages || messages.length === 0 || !setShowDocumentView) {
            return;
        }

        // Check each message for document type
        const hasDocumentMessage = messages.some(m => {
            const messageType = m.type || m.messageType;
            const isDocument = messageType === MESSAGE_TYPES.DOCUMENT || messageType === 'DOCUMENT';
            // if (isDocument) {
            //     console.log('Found document message:', m);
            // }
            return isDocument;
        });
        
        if (hasDocumentMessage) {
            // console.log('Document message detected, showing DocumentView');
            setShowDocumentView(true);
        }
    }, [messages, setShowDocumentView]);

    const handleKey = useCallback(
        (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
            }
        },
        [message, attachments]
    );

    const handleSend = useCallback(() => {
        if (message.trim() || attachments.length > 0) {
            if (typeof onSend === "function") {
                onSend(message, attachments);
            } else {
                console.error("onSend is not a function", onSend);
            }

            setMessage("");
            setAttachments([]);
            setUploadProgress({});
        }
    }, [message, attachments, onSend]);

    const handleFileSelect = useCallback((e) => {
        const files = Array.from(e.target.files);
        setAttachments((prev) => [...prev, ...files]);
        e.target.value = null;
    }, []);

    const removeAttachment = useCallback((fileName) => {
        setAttachments((prev) => prev.filter((file) => file.name !== fileName));
        setUploadProgress((prev) => {
            const newProgress = { ...prev };
            delete newProgress[fileName];
            return newProgress;
        });
    }, []);

    const getFileIcon = useCallback((fileName) => {
        const extension = fileName.split(".").pop().toLowerCase();
        const imageExtensions = ["jpg", "jpeg", "png", "gif", "svg", "webp"];

        if (imageExtensions.includes(extension)) {
            return <IconPhoto size={16} />;
        }

        return <IconFile size={16} />;
    }, []);

    const handleImagePreview = useCallback((file) => {
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage({
                    src: e.target.result,
                    name: file.name,
                });
            };
            reader.readAsDataURL(file);
        }
    }, []);

    // Find document message
    const documentMessage = useMemo(() => {
        if (!messages || messages.length === 0) return null;
        return messages.find(m => {
            const messageType = m.type || m.messageType;
            return messageType === MESSAGE_TYPES.DOCUMENT || messageType === 'DOCUMENT';
        });
    }, [messages]);

    const content = useMemo(() => {
        if (!messages || messages.length === 0) {
            return (
                <Text align="center" color="dimmed" p="xl">
                    No messages yet. Start a conversation!
                </Text>
            );
        }

        return messages.map((m) => {
            const messageType = m.type || m.messageType;
            const isDocument = messageType === MESSAGE_TYPES.DOCUMENT || messageType === 'DOCUMENT';

            const isSender = m.senderId === user.id
            
            // For document messages, show DocumentView if showDocumentView is true, else show normal message
            if (isDocument && showDocumentView && !isSender && m.json_data?.acknowledged !== true) {
                return (
                    <DocumentView
                        key={m.id}
                        message={m}
                        onClose={() => setShowDocumentView && setShowDocumentView(false)}
                        onSend={onSend}
                        acknowledgeMessage={acknowledgeMessage}
                    />
                );
            }
            
            // For normal messages (or document messages when showDocumentView is false), show MessageBubble
            return (
                <MessageBubble
                    key={m.id}
                    message={m}
                    onViewDocument={() => setShowDocumentView && setShowDocumentView(true)}
                />
            );
        });
    }, [messages, setShowDocumentView, showDocumentView, onSend]);

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
    // console.log(messages);
    return (
        <Box
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                overflow: "hidden",
                justifyContent: "space-between",
            }}
        >
            {/* Header */}
            <Box p="md">
                <Group position="apart" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Box>
                        <Text
                            weight={700}
                            size="0.75rem"
                            c={theme.colors.white[0]}
                        >
                            You chat with
                        </Text>
                    </Box>
                    <Group style={{ justifyContent: 'space-between', width: '100%' }}>
                        <Group>
                            <Box style={{ position: "relative" }}>
                                <HexContainer size={50}>
                                    {avatarUrl ? (
                                        <img src={avatarUrl} alt={displayName || "avatar"} />
                                    ) : (
                                        (displayName?.[0]?.toUpperCase() || "?")
                                    )}
                                </HexContainer>
                                {online && (
                                    <Box
                                        style={{
                                            position: "absolute",
                                            bottom: 5,
                                            right: 3,
                                            width: 7,
                                            height: 7,
                                            backgroundColor: "#20C997",
                                            borderRadius: "50%",
                                        }}
                                    />
                                )}
                            </Box>
                            <Box>
                                <Text weight={800} size="lg" color="#E9ECEF">
                                    {displayName ? displayName.charAt(0).toUpperCase() + displayName.slice(1) : ""}
                                </Text>
                                <Text size="xs" color={online ? "#20C997" : "#ADB5BD"}>
                                    {online ? "Online" : "Offline"}
                                </Text>
                            </Box>
                        </Group>
                        <Group spacing={8}>
                            <ActionIcon variant="subtle" color="gray">
                                <IconDotsVertical size={18} />
                            </ActionIcon>
                        </Group>
                    </Group>
                </Group>
            </Box>

            <Divider color={theme.colors.inputBgColor[0]} size={"sm"} />

            {/* Messages Area */}
            <ScrollArea
                style={{ flexGrow: 1, padding: 20 }}
                scrollbarSize={8}
                px={60}
                offsetScrollbars
                type="auto"
                ref={scrollAreaRef}
                onScrollPositionChange={onScroll}
            >   
                {/* Load More Button */}
                {hasMoreMessages && (
                    <Box mb="md" style={{ textAlign: 'center' }}>
                        <Button
                            variant="subtle"
                            size="sm"
                            loading={loadingMore}
                            onClick={onLoadMore}
                            disabled={loadingMore}
                        >
                            {loadingMore ? 'Loading...' : 'Load More Messages'}
                        </Button>
                    </Box>
                )}

                {content}
            </ScrollArea>

            {/* Attachments Preview */}
            {attachments.length > 0 && (
                <Box
                    p="xs"
                    style={{ borderTop: "1px solid #343A40", backgroundColor: "#1A1D20" }}
                >
                    <Group spacing="xs" style={{ flexWrap: "wrap" }}>
                        {attachments.map((file) => (
                            <Badge
                                key={file.name}
                                size="lg"
                                radius="sm"
                                color="dark"
                                leftSection={getFileIcon(file.name)}
                                rightSection={
                                    <ActionIcon
                                        size="xs"
                                        color="gray"
                                        onClick={() => removeAttachment(file.name)}
                                    >
                                        <IconX size={12} />
                                    </ActionIcon>
                                }
                                styles={{
                                    root: {
                                        padding: "6px 8px",
                                        cursor: file.type.startsWith("image/")
                                            ? "pointer"
                                            : "default",
                                    },
                                }}
                                onClick={() => file.type.startsWith("image/") && handleImagePreview(file)}
                            >
                                {file.name.length > 20
                                    ? `${file.name.substring(0, 17)}...`
                                    : file.name}
                            </Badge>
                        ))}
                    </Group>
                    {Object.keys(uploadProgress).length > 0 && (
                        <Box mt="xs">
                            {Object.entries(uploadProgress).map(([fileName, progress]) => (
                                <Box key={fileName} mb="xs">
                                    <Group position="apart" mb="xs" spacing="xs">
                                        <Text size="xs" color="#ADB5BD">
                                            {fileName}
                                        </Text>
                                        <Text size="xs" color="#ADB5BD">
                                            {progress}%
                                        </Text>
                                    </Group>
                                    <Progress
                                        value={progress}
                                        size="xs"
                                        color={progress === 100 ? "teal" : "blue"}
                                    />
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
            )}

            {/* Message Input */}
            <Box
                p="md"
                px={70}
                style={{
                    borderTop: `1px solid ${theme.colors.inputBgColor?.[0] || "#eaeaea"}`
                }}
            >
                <Group spacing={8} style={{ flex: 1 }}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileSelect}
                        multiple
                    />
                    <Textarea
                        autosize
                        minRows={2}
                        maxRows={4}
                        placeholder="Type your message here"
                        style={{ flex: 1 }}
                        radius="xl"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKey}
                    />
                </Group>
                <Group spacing={8} mt={15} justify="flex-end">
                    {/* <Tooltip label="Attach file">
                        <ActionIcon
                            variant="subtle"
                            color="gray"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <IconPaperclip size={18} />
                        </ActionIcon>
                    </Tooltip> */}
                    <Button
                        variant="primary"
                        size="sm"
                        color={theme.colors.primary[0]}
                        onClick={handleSend}
                        disabled={!message.trim() && attachments.length === 0}
                    >
                        send
                    </Button>
                </Group>
            </Box>

            {/* Image Preview Modal */}
            <Modal
                opened={!!previewImage}
                onClose={() => setPreviewImage(null)}
                title={previewImage?.name}
                size="lg"
            >
                {previewImage && (
                    <Box>
                        <Image
                            src={previewImage.src}
                            alt={previewImage.name}
                            fit="contain"
                            height={400}
                        />
                        <Group position="center" mt="md">
                            <ActionIcon variant="filled" color="blue" size="lg">
                                <IconDownload size={20} />
                            </ActionIcon>
                        </Group>
                    </Box>
                )}
            </Modal>
        </Box>
    );
};

export default ChatWindow;
