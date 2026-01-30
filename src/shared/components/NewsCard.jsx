import { useState, useEffect } from "react";
import { Box, Flex, Text, ActionIcon, Image } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { theme } from "../styles/theme/customTheme";

const NewsCard = ({
  title,
  date,
  mediaSrc,
  content,
  initialLikes = 0,
  initiallyLiked = false,
  onLikeChange,
  showLikes = false,
  likesPlacement = "media",
  background,
  children,
  likeDisabled = false,
  ...props
}) => {
  // Sync with props to reflect Redux state updates (Facebook-like behavior)
  const [liked, setLiked] = useState(initiallyLiked);
  const [likes, setLikes] = useState(initialLikes);

  // Update local state when props change (from Redux updates)
  useEffect(() => {
    setLiked(initiallyLiked);
  }, [initiallyLiked]);

  useEffect(() => {
    setLikes(initialLikes);
  }, [initialLikes]);

  const toggleLike = () => {
    if (likeDisabled) return; // Prevent clicks while processing
    // Don't update local state here - let Redux handle it
    // Just trigger the action
    if (onLikeChange) onLikeChange();
  };

  const LikeCluster = (
    <Flex align="center" gap={8}>
      <Text size="xs" c={theme.colors.white[0]}>
        {" "}
        {likes.toLocaleString()}{" "}
      </Text>
      <ActionIcon
        size="sm"
        variant="transparent"
        color={liked ? "red" : "white"}
        aria-label="Like"
        onClick={toggleLike}
        disabled={likeDisabled}
        style={{ opacity: likeDisabled ? 0.5 : 1, cursor: likeDisabled ? 'not-allowed' : 'pointer' }}
      >
        {liked ? <IconHeartFilled color="red" size={16} /> : <IconHeart size={16} />}
      </ActionIcon>
    </Flex>
  );

  const resolvedPlacement =
    likesPlacement === "media" && !mediaSrc ? "footer" : likesPlacement;

  return (
    <Box
      w="100%"
      h="100%"
      p="md"
      {...props}
      style={{
        background: background || theme.colors.secondaryGrey[0],
        borderRadius: theme.radius.md,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Header */}
      {(title || date) && (
        <Flex mb="sm" align="center" justify="space-between">
          <Box>
            {title && (
              <Text
                c={theme.colors.white[0]}
                fw={600}
                tt="capitalize"
              >
                {title}
              </Text>
            )}
            {date && (
              <Text size="xs" c={theme.colors.text[0]} mt={4}>
                {date}
              </Text>
            )}
          </Box>
          {showLikes && resolvedPlacement === "header" && LikeCluster}
        </Flex>
      )}

      {/* Media section with like overlay */}
      {mediaSrc && (
        <Box
          pos="relative"
          style={{
            overflow: "hidden",
            borderRadius: theme.radius.md,
          }}
        >
          <Image
            src={mediaSrc}
            alt={title || "news media"}
            radius={theme.radius.md}
            mih={260}
            h={"100%"}
            fit="cover"
          />

          {showLikes && resolvedPlacement === "media" && (
            <Flex
              pos="absolute"
              bottom={10}
              right={10}
              align="center"
              gap={8}
              style={{
                backgroundColor: "rgba(0,0,0,0.35)",
                padding: "6px 8px",
                borderRadius: theme.radius.sm,
                backdropFilter: "blur(2px)",
              }}
            >
              {LikeCluster}
            </Flex>
          )}
        </Box>
      )}

      {/* Content body */}
      <Box h={"100%"}>
        {content && (
          <Text size="sm" c={theme.colors.text[0]}>
            {content}
          </Text>
        )}
        {children}
      </Box>

      {showLikes && resolvedPlacement === "footer" && (
        <Flex
          pos="absolute"
          bottom={16}
          right={16}
          align="center"
          gap={8}
          style={{
            backgroundColor: "rgba(0,0,0,0.35)",
            padding: "6px 8px",
            borderRadius: theme.radius.sm,
            backdropFilter: "blur(2px)",
          }}
        >
          {LikeCluster}
        </Flex>
      )}
    </Box>
  );
};

export default NewsCard;
