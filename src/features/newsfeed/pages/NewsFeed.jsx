import { Grid, Image } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import NewsCard from "../../../shared/components/NewsCard";
import gamerImg from "../../../assets/creators/gamer.jpg";
import coverImg from "../../../assets/creators/cover_image.jpg";
const NewsFeed = () => {
  return (
    <Grid gutter={20}>
      <Grid.Col span={{ base: 12 }}>
        <NewsCard title="gemein update" date="22nd SEPT 2025" />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <NewsCard
          title="picture gallery: tournament xyzzy"
          date="22nd SEPT 2025"
          initialLikes={800}
          initiallyLiked={false}
          showLikes
        >
          <Carousel withControls={false} withIndicators height={300}>
            <Carousel.Slide>
              <Image src={gamerImg} mih={260} h={"100%"} fit="cover" />
            </Carousel.Slide>
            <Carousel.Slide>
              <Image src={coverImg} mih={260} h={"100%"} fit="cover" />
            </Carousel.Slide>
            <Carousel.Slide>
              <Image src={gamerImg} mih={260} h={"100%"} fit="cover" />
            </Carousel.Slide>
          </Carousel>
        </NewsCard>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <NewsCard title="creator joining brand" date="22nd SEPT 2025" />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <NewsCard title="your income report" date="22nd SEPT 2025" />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <NewsCard title="gemein update" date="22nd SEPT 2025" />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <NewsCard title="gemein update" date="22nd SEPT 2025" />
      </Grid.Col>
    </Grid>
  );
};
export default NewsFeed;
