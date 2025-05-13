import styled from "styled-components";

const Button = styled.button`
  font-family: ${({ theme }) => theme.typography.exo2.regular};
  background-color: ${({ theme, $variant }) =>
    $variant === "primary"
      ? theme.baseColors.brandPrimary
      : $variant === "secondary"
      ? theme.baseColors.brandSecondary
      : $variant === "hoverGray"
      ? theme.colors.hoverCta.background
      : $variant === "darkGray"
      ? theme.baseColors.ctaDarkGray
      : theme.baseColors.brandPrimary};
  color: ${({ theme, $variant }) =>
    $variant === "primary"
      ? theme.baseColors.dark
      : $variant === "secondary"
      ? theme.baseColors.dark
      : theme.colors.hoverCta.text};

  font-size: ${({ $size, theme }) => {
    if ($size === "small") return theme.fontSize.small;
    if ($size === "large") return theme.fontSize.large;
    return theme.fontSize.medium;
  }};

  width: ${({ $width }) => ($width ? $width : "auto")};
  padding: ${({ $padding }) => ($padding ? $padding : "1rem")};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-weight: ${({ $variant }) =>
    $variant === "primary" ? 600 : $variant === "secondary" ? 500 : 400};
  transition: background 0.2s ease-in-out;
  line-height: 1;

  &:hover {
    background-color: ${({ theme, $variant }) =>
      $variant === "hoverGray" ? theme.colors.hoverCta.hover : null};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const ButtonWrapper = (props) => <Button {...props} />;

export default ButtonWrapper;
