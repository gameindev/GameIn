import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const CardContent = styled.div`
  font-size: 0.875rem;
  font-family: ${({ theme }) => theme.typography.exo2.extraBold};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text};
  transition: height 0.3s ease-in-out;
    width: 70%;
`;

const CardText = styled.p`
  font-size: 0.875rem;
  font-family: ${({ theme }) => theme.typography.exo2.medium};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ $isExpanded }) => ($isExpanded ? "none" : 3)};
  line-clamp: ${({ $isExpanded }) => ($isExpanded ? "none" : 3)};
  transition: -webkit-line-clamp 0.3s ease-in-out, max-height 0.3s ease-in-out;
`;

const ReadMoreText = styled.button`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.exo2.extraBold};
  cursor: pointer;
  font-weight: bold;
  font-size: 0.875rem;
  margin-top: 0.125rem;
  width: auto;
  padding: 0;
  background: none;
  position: relative;

  &:hover {
    text-decoration: underline;
  }

  visibility: ${({ $show }) => ($show ? "visible" : "hidden")};
`;

const DownChevron = styled.span`
  position: relative;
  top: 50%;
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  background: transparent;
  border-top: 0.063rem solid white;
  border-right: 0.063rem solid white;
  transform: translate(0%, -50%) rotate(135deg);
  margin-left: 1rem;
  transition: all 200ms ease;
`;

const TextWithReadMore = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowReadMore, setShouldShowReadMore] = useState(false);

  const textRef = useRef(null);

  const handleToggle = () => setIsExpanded((prev) => !prev);

  const checkTextHeight = () => {
    if (textRef.current) {
      const isTextLong =
        textRef.current.scrollHeight > textRef.current.clientHeight;
      setShouldShowReadMore(isTextLong);
    }
  };

  useEffect(() => {
    checkTextHeight();

    const resizeListener = () => checkTextHeight();
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [content]);

  return (
    <CardContent className="card_para">
      <div className="readmore">
        <CardText ref={textRef} $isExpanded={isExpanded}>
          {content}
        </CardText>

        <ReadMoreText
          role="button"
          $show={shouldShowReadMore ? "visible" : undefined}
          onClick={handleToggle}
        >
          {isExpanded ? "Read Less" : "Read More"}
          <DownChevron />
        </ReadMoreText>
      </div>
    </CardContent>
  );
};

export default TextWithReadMore;
