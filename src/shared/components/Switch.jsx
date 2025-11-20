import { Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { theme } from "../../shared/styles/theme/customTheme";
import styled from "styled-components";

const SwitchStyles = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.gap.xs};

    label {
        position: relative;
        width: 3.75em;
        height: 2.125em;
    }

    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${theme.colors.inputBgColor[0]};
        transition: 0.3s;
        border-radius: ${theme.radius.sm};
    }

    .slider > .icon {
        position: absolute;
        height: 1.625em;
        width: 1.625em;
        left: 0.25em;
        bottom: 0.25em;
        background-color: ${theme.colors.grey[0]};
        color: ${theme.colors.white[0]};
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: ${theme.radius.sm};
        font-size: ${theme.fontSizes.md};
        transition: 0.3s;
    }

    input:checked + .slider > .icon {
        transform: translateX(1.625em);
        background-color: ${theme.colors.primary[0]};
    }
`;

export const SwitchButton = ({ fieldName, label, checked, value, onChange, onClick, name, disabled, ...rest }) => {

  const isControlled = typeof checked === "boolean";
  const initial = isControlled ? checked : Boolean(value);
  const [internal, setInternal] = useState(initial);

  const isChecked = useMemo(() => (isControlled ? Boolean(checked) : internal), [isControlled, checked, internal]);

  useEffect(() => {
    if (!isControlled) setInternal(Boolean(value));
  }, [value, isControlled]);
  const toggle = () => {
    const next = !isChecked;
    if (!isControlled) setInternal(next);
    if (typeof onChange === "function") onChange(next);
    if (typeof onClick === "function") onClick(next);
  };

  return (
    <SwitchStyles>
      <Text>{label}</Text>
      <label>
        <input
          type="checkbox"
          name={name || fieldName}
          checked={isChecked}
          onChange={toggle}
          disabled={disabled}
          aria-checked={isChecked}
          {...rest}
        />
        <span className="slider">
          <span className="icon">
            {isChecked ? (
              <IconCheck size={theme.spacing.sm} color="#3C4044" />
            ) : (
              <IconX size={theme.spacing.sm} />
            )}
          </span>
        </span>
      </label>
    </SwitchStyles>
  );
};




