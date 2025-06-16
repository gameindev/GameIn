import React from "react";
import { ActionIcon } from "@mantine/core";
import gearIcon from "../../../assets/shared/gearIcon.svg";

const IconButton = ({
  onClick,
  size = "lg",
  color = "dark",
  variant = "default",
  ...props
}) => {
  return (
    <ActionIcon
      onClick={onClick}
      size={size}
      color={color}
      variant={variant}
      {...props}
      style={(theme) => ({
        backgroundColor: theme.colors.inputBgColor[0],
        border: "none",
        transition: "background-color 0.2s ease, transform 0.2s ease",
        "&:hover": {
          backgroundColor: theme.colors.iconHover[0],
        },
      })}
    >
      <img src={gearIcon} alt="Settings" width={10} height={10} />
    </ActionIcon>
  );
};

export default IconButton;
