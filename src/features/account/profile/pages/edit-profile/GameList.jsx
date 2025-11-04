import { Box, Button, Group, Text } from "@mantine/core";
import { IconArrowBigDown, IconArrowBigUp } from "@tabler/icons-react";
import { theme } from "../../../../../shared/styles/theme/customTheme";



const GameList = ({
    games,
    onDelete,
    onFavoriteToggle,
    onMove,
}) => {

    const favoriteCount = games.filter((g) => g.favorite).length;

    return (
        <>
            {games?.map((game, index) => (
                <Group key={index} spacing="sm" align="center">
                    <Box style={{ flexGrow: 1 }}>
                        <Text fw={500}>{game.title}</Text>
                        <Text size="xs" c={theme.colors.white[0]}>
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
                        <IconArrowBigUp stroke={2} size={16} />
                    </Button>

                    {/* Move Down */}
                    <Button
                        variant="light"
                        onClick={() => onMove(index, index + 1)}
                        disabled={index === games.length - 1}
                        title="Move Down"
                    >
                        <IconArrowBigDown stroke={2} size={16} />
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
    )
}

export default GameList