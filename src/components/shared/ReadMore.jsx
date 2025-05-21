import { Anchor, Button, Text } from "@mantine/core";
import { useState } from "react";
import styled from "styled-components";
import { ChevronDown, ChevronUp  } from 'lucide-react';

const ReadMoreText = styled.div`
  a {
    display: inline-flex;
    gap: 0.25rem;
    align-items: flex-end;
  }
`;

const ReadMore = ({ content, maxChars = 100, color }) => {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded(prev => !prev);

  const shouldTruncate = content.length > maxChars;
  const displayText =
    expanded || !shouldTruncate ? content : `${content.slice(0, maxChars)}...`;

  return (
    <ReadMoreText>
      <Text c="white">
        {displayText} &nbsp;
        {shouldTruncate && (
          <Anchor
            variant="subtle"
            c={color}
            size="md"
            fw="600"
            padding={0}
            onClick={toggle}
          >
            {expanded ? (
              <>
                Show less
                <ChevronUp  size={18} />
              </>
            ) : (
              <>
                Read more
                <ChevronDown size={18} />
              </>
            )}
          </Anchor>
        )}
      </Text>
    </ReadMoreText>
  );
};

export default ReadMore;
