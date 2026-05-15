import { useEffect, useState } from "react";
import {
    Button,
    Group,
    Image,
    Modal,
    Textarea,
    ActionIcon,
    Badge,
    Divider,
    FileButton,
    Flex,
    Paper,
    Stack,
    Text,
    TextInput,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { createPost } from "../store/feedSlice";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";
import api from "../../../app/services/api";

import {
    IconPhotoFilled,
    IconWorld,
    IconX,
} from "@tabler/icons-react";

import { theme } from "./../../../shared/styles/theme/customTheme";
import ProfileAvatar from "../../../shared/components/ProfileAvatar";
import { getProfileDisplayName } from "../../../shared/utils/helpers/useProfileMediaUrl.helper";

function readFilesAsDataUrls(files) {
    if (!files || files.length === 0) return Promise.resolve([]);
    const readers = Array.from(files).map(
        (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            })
    );
    return Promise.all(readers);
}

// Upload files and get upload IDs
async function uploadFiles(files) {
    if (!files || files.length === 0) return [];

    const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/uploads/file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Backend may return entity as response.data or response.data.data
            const entity = response.data?.data ?? response.data;
            return entity;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    });

    return Promise.all(uploadPromises);
}

// Determine media type from file
function getMediaType(file) {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('audio/')) return 'audio';
    return 'document';
}

export default function AddPostModal({ opened, onClose }) {
    const dispatch = useAppDispatch();
    const user = useAppSelector((s) => s.user?.profile);
    const displayName = getProfileDisplayName(user) || "You";
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!opened) {
            setContent("");
            setFiles([]);
            setPreviews([]);
            setSaving(false);
        }
    }, [opened]);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            if (!files || files.length === 0) {
                setPreviews([]);
                return;
            }
            const dataUrls = await readFilesAsDataUrls(files);
            if (!cancelled) setPreviews(dataUrls);
        })();
        return () => {
            cancelled = true;
        };
    }, [files]);

    const handleSave = async () => {
        if (!content.trim() && (!files || files.length === 0)) {
            showNotificationHelper(
                "Validation Error",
                "Please add content or media to your post.",
                NOTIFICATION_TYPES.ERROR
            );
            return;
        }
        setSaving(true);
        try {
            // Upload files first; backend expects media as [{ upload_id, media_type }]
            let media = [];
            if (files && files.length > 0) {
                const uploadResults = await uploadFiles(files);
                media = uploadResults
                    .map((upload, index) => {
                        const id = upload?.id ?? upload?.upload_id;
                        const numId = typeof id === 'number' ? id : parseInt(id, 10);
                        if (Number.isNaN(numId) || numId <= 0) return null;
                        return {
                            upload_id: numId,
                            media_type: getMediaType(files[index]),
                            order: index,
                        };
                    })
                    .filter(Boolean);
            }
            // Backend requires type: 'text' | 'image' | 'video' | 'audio' | 'mixed'
            const hasMedia = media.length > 0;
            const mediaTypes = [...new Set(media.map((m) => m.media_type))];
            const type =
                !hasMedia
                    ? "text"
                    : mediaTypes.length > 1
                        ? "mixed"
                        : mediaTypes[0];
            const contentText = [title, content].filter(Boolean).join("\n").trim() || undefined;
            const payload = {
                type,
                content: contentText,
                ...(media.length > 0 && { media }),
            };
            await dispatch(createPost(payload)).unwrap();
            showNotificationHelper(
                "Post published",
                "Your post has been added to the feed.",
                NOTIFICATION_TYPES.SUCCESS
            );
            onClose && onClose();
        } catch (error) {
            console.error("Error creating post:", error);
            showNotificationHelper(
                "Error",
                error?.message || error || "Failed to create post. Please try again.",
                NOTIFICATION_TYPES.ERROR
            );
        } finally {
            setSaving(false);
        }
    };

    const hasMultiple = (previews || []).length > 1;

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            withCloseButton={false}
            size="720px"
            centered
            overlayProps={{ blur: 4, backgroundOpacity: 0.45 }}
            styles={{
                content: {
                    borderRadius: 18,
                    padding: "1rem 0.5rem 1rem",
                    boxShadow: "0 1.25rem 3.75rem rgba(0,0,0,0.15)",
                },
            }}
        >
            <Stack gap="md">
                <Group justify="space-between" align="center" px="sm">
                    <Text fw={700} fz="lg">
                        Create post
                    </Text>
                    <ActionIcon
                        variant="light"
                        color="gray"
                        radius="xl"
                        size={34}
                        onClick={onClose}
                    >
                        <IconX size={18} />
                    </ActionIcon>
                </Group>

                <Divider />

                <Group align="center" gap="sm" px="sm">
                    <ProfileAvatar
                        user={user}
                        size={60}
                        profilePath=""
                    />
                    <Stack gap={4}>
                        <Text fw={700}>{displayName}</Text>
                        <Badge
                            leftSection={<IconWorld size={14} />}
                            variant="light"
                            color="gray"
                            radius="md"
                            size="lg"
                            styles={{ root: { paddingInline: "0.65rem" } }}
                        >
                            Friends
                        </Badge>
                    </Stack>
                </Group>

                <Stack gap="xs" px="sm">
                    <TextInput
                        placeholder="Add a title (optional)"
                        value={title}
                        onChange={(e) => setTitle(e.currentTarget.value)}
                        radius="md"
                        variant="inputBgColor"
                    />
                    <Textarea
                        placeholder={`What's on your mind, ${displayName}?`}
                        value={content}
                        onChange={(e) => setContent(e.currentTarget.value)}
                        minRows={4}
                        autosize
                        variant="inputBgColor"
                    />
                </Stack>

                {previews.length === 1 && (
                    <Paper radius="md" withBorder px="sm">
                        <Image
                            src={previews[0]}
                            radius="md"
                            height={320}
                            fit="cover"
                            my="sm"
                        />
                    </Paper>
                )}
                {hasMultiple && (
                    <Paper radius="md" withBorder px="sm" py="xs">
                        <Carousel withIndicators height={320}>
                            {previews.map((src, idx) => (
                                <Carousel.Slide key={idx}>
                                    <Image src={src} height={320} fit="cover" />
                                </Carousel.Slide>
                            ))}
                        </Carousel>
                    </Paper>
                )}

                <Stack gap="xs" px="sm">
                    <Flex
                        align="center"
                        gap="sm"
                        bg={theme.colors.inputBgColor[0]}
                        p="sm"
                        style={{
                            borderRadius: theme.radius.md,
                            backgroundColor: theme.colors.inputBgColor,
                        }}
                        justify="space-between"
                    >
                        <Flex align="center" gap="xs" style={{ fontWeight: 600 }}>
                            <Text fw={600}>Add to your post</Text>
                        </Flex>

                        <Group gap={8}>
                            <FileButton
                                onChange={(val) =>
                                    setFiles(Array.isArray(val) ? val : val ? [val] : [])
                                }
                                accept="image/png,image/jpeg,image/webp"
                                multiple
                            >
                                {(props) => (
                                    <ActionIcon
                                        {...props}
                                        variant="light"
                                        color="teal"
                                        radius="xl"
                                        size={36}
                                        title="Photo/video"
                                    >
                                        <IconPhotoFilled size={18} />
                                    </ActionIcon>
                                )}
                            </FileButton>
                        </Group>
                    </Flex>

                    <Button
                        radius="md"
                        size="md"
                        fullWidth
                        onClick={handleSave}
                        variant="primary"
                        loading={saving}
                        disabled={saving || (!content && previews.length === 0)}
                    >
                        Post
                    </Button>
                </Stack>
            </Stack>
        </Modal>
    );
}
