import { Button, Group, Text } from "@mantine/core";
import StatBox from "../../../../../shared/components/StatBox";
import FaqList from "../../components/FaqList";
import { useNavigate, useOutletContext } from "react-router";

export default function Faq() {
  const { userProfile, isSelf } = useOutletContext();
  const userId = userProfile?.id;
  const navigate = useNavigate(); 
  return (
    <>
      <Group pos={"relative"} justify="center">
        <Button
          pos={"absolute"}
          left={0}
          variant="darkGrey"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Text fz={35} align="center" mb={20}>
          Add FAQ
        </Text>
      </Group>
      <FaqList userId={userId} isSelf={isSelf} />
    </>
  );
}
