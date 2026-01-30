import { Grid, Image } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import NewsCard from "../../../shared/components/NewsCard";
import gamerImg from "../../../assets/creators/gamer.jpg";
import coverImg from "../../../assets/creators/cover_image.jpg";
import UserPosts from "../components/UserPosts";

const NewsFeed = () => {
  return (
    <Grid gutter={20}>
      <Grid.Col span={{ base: 12 }}>
        <UserPosts showAddBox={true} />
      </Grid.Col>
    </Grid>
  );
};

export default NewsFeed;
