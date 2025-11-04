import { Anchor, Text } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";
import styled from "styled-components";



const ReadMoreText = styled.div`
    a {
        display: inline-flex;
        gap: 0.25em;
        align-items: flex-end;
    }
`;



export default function ReadMore({ content, maxChars = 100, color }) {
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
                                <IconChevronUp size="1.125" />
                            </>
                        ) : (
                            <>
                                Read more
                                <IconChevronDown size="1.125" />
                            </>
                        )}
                    </Anchor>
                )}
            </Text>
        </ReadMoreText>
    )
}