import React from "react";
import { Group, Image, Box, Text, Button } from "@mantine/core";

export default function GameList({ games, onDelete, onFavoriteToggle }) {
  const favoriteCount = games.filter((g) => g.favorite).length;

  return (
    <>
      {games?.map((game, index) => (
        <Group key={index} spacing="sm" align="center">
          <Image w={32} h={32} src={game.favicon.url} alt="favicon" />
          <Box style={{ flexGrow: 1 }}>
            <Text fw={500}>{game.title}</Text>
            <Text size="xs" c="dimmed">
              {game.url}
            </Text>
          </Box>

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
            {game.favorite ? (
              <Text>Unfavorite</Text>
            ) : (
              <Text>Favorite</Text>
            )}
          </Button>

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
