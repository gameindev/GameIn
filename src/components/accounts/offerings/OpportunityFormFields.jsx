import React, { useEffect } from "react";
import {
  Flex,
  Stack,
  Text,
  NumberInput,
  Textarea,
  Checkbox,
} from "@mantine/core";
import { Link } from "react-router";
import { useWatch } from "react-hook-form";
import FormField from "../../shared/ui/FormField";
import { InlineFields, OfferingOpportunities } from "./style";

import {
  SelectField,
  TextField,
  DateField,
  calculatePriceBreakdown,
} from "./../../../utils/helpers/formHelper";
import {
  FORM_CONFIG,
  TIME_MODE_CONFIG,
  LOGO_SIZES_CONFIG,
} from "./../../../config/formConfigs/opportunityConfig";

// Generate field configs
const getFieldConfigs = (mode, type) => {
  const BASE_FIELDS = [
    SelectField("platform", "Platform", { data: FORM_CONFIG.platforms }),
    SelectField("timeMode", "Time Mode", {
      data: TIME_MODE_CONFIG[type] || TIME_MODE_CONFIG.default,
    }),
    ...(mode === "edit" && type !== "videoCommercial"
      ? [TextField("schedule", "Schedule", { placeholder: "Mon - Fri" })]
      : []),
    SelectField("size", "Logo Size", {
      data: LOGO_SIZES_CONFIG[type] || LOGO_SIZES_CONFIG.default,
    }),
  ];

  const CONFIGS = {
    streaming: BASE_FIELDS,
    videoCommercial:
      mode === "edit"
        ? [
            ...BASE_FIELDS,
            {
              name: "repetitionDuration",
              wrapperFields: [
                {
                  name: "videoCommercial.repetation",
                  Component: NumberInput,
                  componentProps: {
                    placeholder: "00",
                    min: 0,
                    hideControls: true,
                    styles: { input: { width: "3rem", textAlign: "center" } },
                  },
                },
                {
                  name: "videoCommercial.duration",
                  Component: SelectField("duration", "Duration", {
                    data: FORM_CONFIG.durations,
                    placeholder: "sec",
                    styles: { input: { width: "4rem", textAlign: "center" } },
                  }).Component,
                },
              ],
              wrapper: (children) => (
                <Flex
                  justify="space-between"
                  align="center"
                  spacing={4}
                  key="videoCommercial.repetitionDuration"
                >
                  <Text>Repetition / Duration</Text>
                  <InlineFields>
                    <Flex spacing={4} align="center">
                      {children[0]}
                      <Text size="sm" fw={600} c="dimmed">
                        ×
                      </Text>
                      {children[1]}
                    </Flex>
                  </InlineFields>
                </Flex>
              ),
            },
          ]
        : [
            ...BASE_FIELDS,
            SelectField("duration", "Duration", {
              data: FORM_CONFIG.durations,
            }),
            TextField("repetation", "Repetition", {
              type: "number",
              min: 0,
              style: { width: "7.5rem" },
            }),
          ],
    socialMedia: BASE_FIELDS,
    merchProducts: [
      ...BASE_FIELDS.slice(0, 2),
      SelectField("types", "Type", { data: FORM_CONFIG.postTypes }),
    ],
    dateTitle: [
      DateField("startDate", "Start Date", { required: true }),
      DateField("endDate", "End Date", { required: true }),
      TextField("title", "Title", { required: true, style: { width: "100%" } }),
      {
        name: "description",
        Component: Textarea,
        required: true,
        componentProps: {
          label: "Description",
          placeholder: "Enter description",
          style: { width: "100%" },
        },
      },
    ],
    price: [
      TextField("choosePrice", "Choose your price", {
        type: "number",
        rightSection: <span style={{ color: "#888", fontSize: 14 }}>USD</span>,
      }),
      TextField("gameinFee", "+ 5% gamein fee", {
        disabled: true,
        value: "0.00",
        rightSection: <span style={{ color: "#888", fontSize: 14 }}>USD</span>,
      }),
      TextField("gameinTax", "+ 15.3% tax = total", {
        disabled: true,
        value: "0.00",
        rightSection: <span style={{ color: "#888", fontSize: 14 }}>USD</span>,
      }),
      SelectField("paymentType", "Payment method", {
        data: FORM_CONFIG.paymentTypes,
      }),
    ],
    terms: [
      {
        name: "acknowledgement",
        Component: Checkbox,
        componentProps: {
          label: "Check if you have read and understood the terms of use",
        },
        wrapper: (children) => (
          <Stack key="terms-ack">
            <Text fw={600} c="blue.3" align="center">
              community simplified
            </Text>
            <Text>
              We have implemented a minimum of terms to be agreed on...
            </Text>
            <Link to="/terms-of-use" style={{ textDecoration: "none" }}>
              <Text size="sm" align="center" fw={600} c="white">
                read more
              </Text>
            </Link>
            {children}
          </Stack>
        ),
      },
    ],
  };

  return CONFIGS[type] || [];
};

export default function OpportunityFormFields({
  control,
  type,
  mode,
  setValue,
}) {
  const fields = getFieldConfigs(mode, type);
  const price = useWatch({ control, name: `${type}.choosePrice` });

  useEffect(() => {
    if (!price) return;
    const { fee, total } = calculatePriceBreakdown(price);
    setValue(`${type}.gameinFee`, fee);
    setValue(`${type}.gameinTax`, total);
  }, [price, setValue, type]);

  return (
    <OfferingOpportunities>
      {fields.map(
        ({
          name,
          Component,
          componentProps,
          wrapper,
          wrapperFields,
          inline,
          required,
        }) => {
          if (wrapper && wrapperFields) {
            const children = wrapperFields.map((child) => (
              <FormField key={child.name} {...child} control={control} inline />
            ));
            return wrapper(children);
          }

          const fieldName = name.includes(".") ? name : `${type}.${name}`;
          const field = (
            <FormField
              key={fieldName}
              name={fieldName}
              control={control}
              Component={Component}
              inline={inline}
              required={required}
              componentProps={componentProps}
            />
          );

          return wrapper ? wrapper([field]) : field;
        }
      )}
    </OfferingOpportunities>
  );
}
