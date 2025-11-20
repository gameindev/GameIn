import { useState } from "react";
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
  ...props
}) => {
  const [liked, setLiked] = useState(initiallyLiked);
  const [likes, setLikes] = useState(initialLikes);

  const toggleLike = () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikes((n) => (nextLiked ? n + 1 : Math.max(0, n - 1)));
    if (onLikeChange) onLikeChange(nextLiked);
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
                tt="lowercase"
                style={{ textTransform: "none" }}
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
      <Box>
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
