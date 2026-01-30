import { useMemo, useState } from "react";
import {
  Accordion,
  Box,
  Button,
  Grid,
  Group,
  Text,
  TextInput,
  Textarea,
  ActionIcon,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { theme } from "../../../../shared/styles/theme/customTheme";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import {
  addFaq as addFaqAction,
  removeFaq as removeFaqAction,
} from "../store/faqSlice";
import StatBox from "../../../../shared/components/StatBox";

export default function FaqList({ userId, isSelf = false, compact = false }) {
  const dispatch = useAppDispatch();
  const faqs = useAppSelector((s) => s.faq?.byUser?.[userId] || []);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const visibleFaqs = useMemo(
    () => (compact ? faqs.slice(0, 5) : faqs),
    [faqs, compact]
  );

  const addFaq = () => {
    const q = question.trim();
    const a = answer.trim();
    if (!q || !a) return;

    dispatch(addFaqAction({ userId, q, a }));
    setQuestion("");
    setAnswer("");
  };

  const removeFaq = (index) => {
    dispatch(removeFaqAction({ userId, index }));
  };

  const renderFaqAccordion = ({ removable = false }) => {
    if (!visibleFaqs.length) {
      return (
        <Text size="sm" c="dimmed">
          {compact
            ? "FAQ not available right now"
            : isSelf
            ? "Add your first FAQ using the form above."
            : "No FAQs yet."}
        </Text>
      );
    }

    return (
      <Accordion
        multiple={false}
        className="faq_accordion"
        px={10}
        py={20}
        styles={{
          root: { color: theme.colors.white[0] },
          item: {
            borderRadius: theme.radius.md,
            marginBottom: 8,
            border: "none",
            position: "relative",
          },
          control: { color: theme.colors.white[0] },
          label: { fontWeight: 700 },
        }}
      >
        {visibleFaqs.map(({ q, a }, i) => (
          <Accordion.Item key={`${q}-${i}`} value={`${q}-${i}`}>
            {/* Remove icon */}
            {removable && (
              <ActionIcon
                color="red"
                variant="subtle"
                size="sm"
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  zIndex: 1,
                }}
                onClick={() => removeFaq(i)}
              >
                <IconTrash size={14} />
              </ActionIcon>
            )}

            <Accordion.Control>
              <Group wrap="nowrap" gap="xs">
                <Text fw={500}>Q:</Text>
                <Text fw={500}>{q}</Text>
              </Group>
            </Accordion.Control>

            <Accordion.Panel>
              <Group wrap="nowrap" align="flex-start" gap="sm">
                <Text fw={500}>A:</Text>
                <Text size="sm">{a}</Text>
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  };

  const renderAddFaqForm =
    isSelf && !compact ? (
      <Group align="center" wrap="nowrap" gap="sm">
        <TextInput
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.currentTarget.value)}
          style={{ flex: 1 }}
          variant="inputBgColor"
          size="sm"
        />

        <Textarea
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.currentTarget.value)}
          autosize
          minRows={1}
          maxRows={3}
          style={{ flex: 2 }}
          variant="inputBgColor"
          size="sm"
        />

        <Button variant="primary" size="xs" onClick={addFaq}>
          Add
        </Button>
      </Group>
    ) : null;

  if (compact) {
    return <Box>{renderFaqAccordion({})}</Box>;
  }

  return (
    <Box>
      <Grid gutter={20}>
        <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
          <Box
            p="md"
            bg={theme.colors.secondaryGrey[0]}
            style={{ borderRadius: theme.radius.md }}
          >
            {renderAddFaqForm}
          </Box>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <StatBox title="Preview">
            {renderFaqAccordion({ removable: isSelf })}
          </StatBox>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
