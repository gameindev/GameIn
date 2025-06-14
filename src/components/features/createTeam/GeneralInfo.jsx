import React from "react";
import {
  Box,
  Button,
  Group,
  rem,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useFormStep } from "./../../../hooks/useFormStep";
import { theme } from "../../../styles/theme/customTheme";
import HexContainer from "../../shared/ui/HexContainer";
import styled from "styled-components";
import CoverBanner from "./../../shared/ui/CoverBanner";
import FormField from "./../../shared/ui/FormField";
import { generalInfoSchema } from "./../../../utils/schemas/CreateTeamSchema";

const AvatorSection = styled.div`
  position: absolute;
  top: -20%;
  left: 2%;
`;

const defaultValues = {
  displayName: "",
  website: "",
  bio: "",
};

const fields = [
  {
    name: "displayName",
    label: "Display Name",
    placeholder: "Enter your Team Name",
    component: TextInput,
  },
  {
    name: "website",
    label: "Website",
    placeholder: "Enter your Website URL",
    component: TextInput,
  },
  {
    name: "bio",
    label: "Bio",
    placeholder: "Bio Details",
    component: Textarea,
  },
];

export default function GeneralInfo({ onNext }) {
  const { control, setValue, watch, handleNextStep } = useFormStep({
    defaultValues,
    onNext,
    schema: generalInfoSchema,
  });
  return (
    <>
      <Box
        pos={"relative"}
        style={{ borderRadius: theme.radius.md, overflow: "hidden" }}
      >
        <CoverBanner size="12.5rem" />
        <Stack
          spacing="xl"
          bg={theme.colors.darkGrey[0]}
          p={50}
          pos={"relative"}
        >
          <Stack w={"50%"} mx={"auto"}>
            <AvatorSection className="avatorSection">
              <HexContainer size={160} />
            </AvatorSection>
            {fields.map(
              ({ name, label, placeholder, component: InputComponent }) => (
                <FormField
                  key={name}
                  name={name}
                  control={control}
                  Component={InputComponent}
                  componentProps={{
                    label,
                    placeholder,
                  }}
                />
              )
            )}
          </Stack>
        </Stack>
      </Box>
      <Group mt="lg" position="center" style={{ justifyContent: "center" }}>
        <Button variant="primary" width={rem(100)} onClick={handleNextStep}>
          Next
        </Button>
      </Group>
    </>
  );
}
