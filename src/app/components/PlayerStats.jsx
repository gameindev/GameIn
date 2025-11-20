import { Card, Flex, Grid, Text, Title, Image } from "@mantine/core";
import { theme } from "../../shared/styles/theme/customTheme";
import { useEffect, useState } from "react";
import HexContainer from "./../../shared/components/HexContainer";

function PlayerStats() {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const demoPlayer = {
      name: "gameinplayer1",
      demographics: {
        age: 23,
        gender: "Male",
        nationality: "USA",
        genre: "Gaming",
        levelPoints: 18320,
      },
      followers: {
        twitch: 35000,
        youtube: 35000,
        instagram: 35000,
        x: 35000,
        tiktok: 35000,
      },
      views: {
        twitch: 35000,
        youtube: 35000,
        instagram: 35000,
        x: 35000,
        tiktok: 35000,
      },
      rank: 1,
    };
    setPlayer(demoPlayer);
  }, []);

  if (!player) return null;

  console.log(player);

  return (
    <div
      style={{
        borderColor: theme.colors.black[0],
        textAlign: "center",
        width: "48em",
        margin: "0 auto",
      }}
    >
      <Title order={3} c="textWhite" fw={800}>
        {player.name}
      </Title>
      <Grid fz={10} mt="lg" justify="center" align="center">
        {/* Left: Demographics */}
        <Grid.Col span={4} sm={12} w="auto" mih={"auto"}>
          <Flex direction="column" gap={4} align="center">
            <Text fw={700} c="textWhite" fz="sm" tt="uppercase" mb={8}>
              Demographics
            </Text>
            {Object.entries(player.demographics).map(([label, value]) => (
              <Card
                className="playerData"
                p={12}
                w={"100%"}
                style={{ alignItems: "center" }}
              >
                <Flex key={label} justify="space-between" w={140}>
                  <Text c="textWhite" fz="sm" tt="uppercase">
                    {label.replace(/([A-Z])/g, " $1")}
                  </Text>
                  <Text c="textWhite" fz="sm" align="left">
                    {value}
                  </Text>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Grid.Col>

        {/* Center: Rank Hex */}
        <Grid.Col span={4} sm={12} w="auto" mih={"auto"}>
          <Flex justify="center" align="center">
            <div
              style={{
                position: "relative",
              }}
            >
              <HexContainer
                background={theme.colors.bannerGrey[0]}
                radius={"0.1"}
                size="300"
              ></HexContainer>
              <div className="small_badge">
                <HexContainer
                  radius={"0.1"}
                  background={theme.colors.primary[0]}
                  size="100"
                >
                  <Text
                    c={theme.colors.black[0]}
                    fw={900}
                    fz={20}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {player.rank}
                  </Text>
                </HexContainer>
              </div>
            </div>
          </Flex>
        </Grid.Col>

        {/* Right: Followers + Views */}
        <Grid.Col span={4} sm={12} w="auto" mih={"auto"}>
          <Flex direction="column" gap={4} align="center">
            <Flex justify="space-between" w="100%" mb={8}>
              <Text
                flex={1}
                fw={700}
                c="textWhite"
                fz="sm"
                tt="uppercase"
              ></Text>
              <Text
                flex={1}
                fw={700}
                c="textWhite"
                fz="sm"
                align="left"
                tt="uppercase"
              >
                Followers
              </Text>
              <Text
                flex={1}
                fw={700}
                c="textWhite"
                fz="sm"
                align="left"
                tt="uppercase"
              >
                Views
              </Text>
            </Flex>
            {Object.keys(player.followers).map((platform) => (
              <Card className="playerData" p={12} w={"100%"}>
                <Flex key={platform} justify="space-between" w={180}>
                  <Text flex={1} c="textWhite" fz="sm" tt="uppercase">
                    {platform}
                  </Text>
                  <Text flex={1} c="textWhite" fz="sm">
                    {player.followers[platform].toLocaleString()}
                  </Text>
                  <Text flex={1} c="textWhite" fz="sm">
                    {player.views[platform].toLocaleString()}
                  </Text>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default PlayerStats;
