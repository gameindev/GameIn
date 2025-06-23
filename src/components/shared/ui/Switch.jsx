import { Check, X } from 'lucide-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { theme } from '../../../styles/theme/customTheme'
import { Text } from '@mantine/core'

const SwitchStyles = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.gap.xs};

    label{  
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
      transition: 0.3 s;
      border-radius: ${theme.radius.sm};
    }

    .slider>.icon {
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


    input:checked + .slider>.icon  {
      transform: translateX(1.625em);
      background-color: ${theme.colors.primary[0]};
    }
`

export default function SwitchButton({ fieldName, label, ...props }) {
    const [checked, setChecked] = useState(false) 
    return (
        <SwitchStyles>
            <Text>{label}</Text>
            <label>
                <input type="checkbox" name={fieldName} onClick={()=>setChecked((prev) => !prev)}  {...props} />
                <span className="slider">
                    <span className='icon'>{checked ? <Check size={theme.spacing.sm} /> : <X size={theme.spacing.sm} />}</span>
                </span>
            </label>
        </SwitchStyles>
    )
}
