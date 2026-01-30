import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/store/hooks";
import { fetchFeed, toggleLikePost } from "../store/feedSlice";
import NewsCard from "../../../shared/components/NewsCard";
import { Box, Grid, Image, Loader, Center, Text, Button, Badge } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconHeart, IconHeartFilled, IconInfoCircle } from "@tabler/icons-react";
import AddPostBox from "./AddPostBox";

// Helper to get media URL
function getMediaUrl(upload) {
    if (!upload) return null;
    if (upload.path?.startsWith('http')) return upload.path;
    return upload.path ? `${import.meta.env.VITE_ASSET_URL || ''}/${upload.path}` : null;
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function PostMedia({ media = [] }) {
    if (media.length > 1) {
        return (
            <Carousel withControls={false} withIndicators height={300}>
                {media.map((mediaItem, idx) => {
                    const url = getMediaUrl(mediaItem.upload);
                    if (!url) return null;
                    return (
                        <Carousel.Slide key={idx}>
                            {mediaItem.media_type === 'image' ? (
                                <Image src={url} h={300} fit="cover" />
                            ) : mediaItem.media_type === 'video' ? (
                                <video
                                    src={url}
                                    controls
                                    style={{ width: '100%', height: 300, objectFit: 'cover' }}
                                />
                            ) : (
                                <Box p="md">
                                    <Text>Media: {mediaItem.upload?.name || 'Unknown'}</Text>
                                </Box>
                            )}
                        </Carousel.Slide>
                    );
                })}
            </Carousel>
        );
    }

    if (media.length === 1) {
        const singleMedia = media[0];
        const url = getMediaUrl(singleMedia.upload);
        if (!url) return null;
        return (
            <Box>
                {singleMedia.media_type === 'image' ? (
                    <Image
                        src={url}
                        radius="md"
                        height={300}
                        fit="cover"
                        mb="sm"
                    />
                ) : singleMedia.media_type === 'video' ? (
                    <video
                        src={url}
                        controls
                        style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: '8px' }}
                        mb="sm"
                    />
                ) : (
                    <Box p="md" mb="sm">
                        <Text>Media: {singleMedia.upload?.name || 'Unknown'}</Text>
                    </Box>
                )}
            </Box>
        );
    }

    return null;
}

export default function UserPosts({ showAddBox = false }) {
    const dispatch = useAppDispatch();
    const feedState = useAppSelector((state) => state.feed);
    const posts = feedState?.posts || [];
    const loading = feedState?.loading || false;
    const error = feedState?.error || null;
    const hasMore = feedState?.hasMore ?? true;
    const offset = feedState?.offset || 0;
    const limit = feedState?.limit || 20;
    const likingPosts = feedState?.likingPosts || {};

    // Optionally add create box if enable
    const safePosts = Array.isArray(posts) ? posts : [];
    const nothingToShow = !showAddBox && safePosts.length === 0;
    useEffect(() => {
        // Always fetch on mount, regardless of state
        dispatch(fetchFeed({ limit: 20, offset: 0 }));
    }, [dispatch]);
    useEffect(() => {
        // Debug log
        // console.log('UserPosts state:', { postsCount: safePosts.length, loading, error, hasMore, offset, feedState });
    }, [safePosts.length, loading, error, hasMore, offset, feedState]);

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            dispatch(fetchFeed({ limit, offset }));
        }
    };

    const handleLike = async (post) => {
        if (likingPosts[post.id]) return;
        await dispatch(toggleLikePost({
            postId: post.id,
            isLiked: post.is_liked || false
        }));
    };

    if (nothingToShow) return null;

    // Show loader only on initial load (when posts are empty and loading)
    if (loading && safePosts.length === 0 && !error) {
        return (
            <Center p="xl">
                <Loader size="lg" />
                <Text mt="md" size="sm" c="dimmed">Loading feed...</Text>
            </Center>
        );
    }                       

    // Show error only if we have no posts
    if (error && safePosts.length === 0) {
        // Extract error message if error is an object
        const errorMessage = typeof error === 'object' 
            ? (error.message || error.error || JSON.stringify(error))
            : error;
        return (
            <Center p="xl">
                <Text c="red">Error loading feed: {errorMessage}</Text>
                <Button
                    mt="md"
                    onClick={() => dispatch(fetchFeed({ limit, offset: 0 }))}
                >
                    Retry
                </Button>
            </Center>
        );
    }

    // Show empty state only if not loading and no posts
    if (!loading && safePosts.length === 0) {
        return (
            <Center p="xl">
                <Text c="dimmed">No posts yet. Be the first to post!</Text>
            </Center>
        );
    }

    return (
        <Box>
            <Grid gutter={20} mb="md">
                {showAddBox && (
                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                        <AddPostBox />
                    </Grid.Col>
                )}
                {safePosts.map((post) => {
                    const media = post.media || [];
                    const isSystemPost = post.source === 'system';
                    const postTitle = isSystemPost
                        ? (post.system_category ? post.system_category.charAt(0).toUpperCase() + post.system_category.slice(1) : 'System')
                        : (post.user?.username || post.title || "User");

                    return (
                        <Grid.Col key={post.id} span={{ base: 12, md: 6, lg: 4 }}>
                            <NewsCard
                                title={postTitle}
                                date={formatDate(post.created_at)}
                                initialLikes={post.like_count || 0}
                                initiallyLiked={post.is_liked || false}
                                showLikes={!isSystemPost}
                                onLikeChange={() => !isSystemPost && handleLike(post)}
                                likeDisabled={!!likingPosts[post.id]}
                            >
                                {isSystemPost && (
                                    <Badge
                                        color="blue"
                                        variant="light"
                                        leftSection={<IconInfoCircle size={14} />}
                                        mb="sm"
                                    >
                                        System Update
                                    </Badge>
                                )}
                                {post.content && (
                                    <Box mb="sm">
                                        <Text size="sm" lineClamp={4}>
                                            {post.content}
                                        </Text>
                                    </Box>
                                )}
                                <PostMedia media={media} />
                                {post.location && (
                                    <Text size="xs" c="dimmed" mt="xs">
                                        📍 {post.location}
                                    </Text>
                                )}
                                {post.hashtags && post.hashtags.length > 0 && (
                                    <Box mt="xs">
                                        {post.hashtags.map((tag, idx) => (
                                            <Text
                                                key={idx}
                                                component="span"
                                                size="xs"
                                                c="blue"
                                                mr="xs"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                #{tag}
                                            </Text>
                                        ))}
                                    </Box>
                                )}
                            </NewsCard>
                        </Grid.Col>
                    );
                })}
            </Grid>

            {hasMore && (
                <Center mt="md">
                    <Button
                        variant="outline"
                        onClick={handleLoadMore}
                        loading={loading}
                        disabled={loading}
                    >
                        Load More
                    </Button>
                </Center>
            )}
        </Box>
    );
}

