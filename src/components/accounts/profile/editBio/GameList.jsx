import React from "react";
import { Group, Image, Box, Text, Button } from "@mantine/core";
import { ArrowBigUp , ArrowBigDown } from "lucide-react";

export default function GameList({
  games,
  onDelete,
  onFavoriteToggle,
  onMove,
}) {
  const favoriteCount = games.filter((g) => g.favorite).length;
  
  return (
    <>
      {games?.map((game, index) => (
        <Group key={index} spacing="sm" align="center">
          <Box style={{ flexGrow: 1 }}>
            <Text fw={500}>{game.title}</Text>
            <Text size="xs" c="dimmed">
              {game.url}
            </Text>
          </Box>

          {/* Favorite Toggle */}
          <Button
            variant="subtle"
            disabled={!game.favorite && favoriteCount >= 4}
            onClick={() => onFavoriteToggle(index)}
            title={
              game.favorite
                ? "Unmark as favorite"
                : favoriteCount >= 4
                ? "You can only mark up to 4 favorite games"
                : "Mark as favorite"
            }
          >
            {game.favorite ? <Text>Unfavorite</Text> : <Text>Favorite</Text>}
          </Button>

          {/* Move Up */}
          <Button
            variant="light"
            onClick={() => onMove(index, index - 1)}
            disabled={index === 0}
            title="Move Up"
          >
            <ArrowBigUp  size={16} />
          </Button>

          {/* Move Down */}
          <Button
            variant="light"
            onClick={() => onMove(index, index + 1)}
            disabled={index === games.length - 1}
            title="Move Down"
          >
            <ArrowBigDown size={16} />
          </Button>

          {/* Delete */}
          <Button
            size="xs"
            color="red"
            variant="light"
            onClick={() => onDelete(index)}
          >
            Delete
          </Button>
        </Group>
      ))}
    </>
  );
}
