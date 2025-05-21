import { Button, Title } from "@mantine/core";
import { PresentationStyles } from "../../styles/pages/welcomPage";
import ReadMore from "../shared/ReadMore";

export default function PresentationCard({data}) {
  const {title, subTitle, className, readMoreColor, readMoreContent, btnText, image, altText} = data;

  return (
    <>
      <PresentationStyles className={className}>
        <div className="presentation_cardContent">
          <div className="text_block">
            <Title order={2} c="white" className="presentation_cardTitle">
              {" "}
              {title} <span>{subTitle}</span>
            </Title>
            <ReadMore
              color={readMoreColor}
              content={readMoreContent}
            />
          </div>
          <Button
            variant="primary"
            size="sm"
            padding="0.5rem"
            width="8.5rem"
            mt="xl"
          >
            {btnText}
          </Button>
        </div>
        <div>
          <img src={image} alt={altText} />
        </div>
      </PresentationStyles>
    </>
  );
}
