import { useWatch } from "react-hook-form";
import { useFormDisabled } from "../../../shared/context/FormDisableContext";
import { useEffect } from "react";
import {
  calculatePriceBreakdown,
  DateField,
  SelectField,
  TextField,
} from "../../../shared/utils/helpers/opportunityForm.helper";
import {
  InlineFields,
  OfferingOpportunities,
} from "../styles/opportunity-styles";
import { FORM_CONFIG } from "../types/formConfig.mapper";
import { TIME_MODE_CONFIG } from "../types/timeModeConfig.mapper";
import { LOGO_SIZES_CONFIG } from "../types/logoSizeConfig.mapper";
import { OfferingCategory } from "../../../shared/enums/offeringCategoryEnum";
import {
  Checkbox,
  Flex,
  Image,
  NumberInput,
  Space,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { Link } from "react-router";
import FormField from "../../../shared/components/FormField";
import TermsAndCondition from '../../../assets/shared/terms-and-condition.svg';

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
    [OfferingCategory.LOGO_STREAM]: BASE_FIELDS,
    [OfferingCategory.VIDEO_COMMERCIAL]:
      mode === "edit"
        ? [
            ...BASE_FIELDS,
            {
              name: "repetitionDuration",
              wrapperFields: [
                {
                  name: "repetation",
                  Component: NumberInput,
                  componentProps: {
                    placeholder: "00",
                    min: 0,
                    hideControls: true,
                    styles: { input: { width: "3rem", textAlign: "center" } },
                  },
                },
                {
                  name: "duration",
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
                      <Space w={8} />
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

    [OfferingCategory.SOCIAL_POST]: BASE_FIELDS,
    [OfferingCategory.MERCHANDISE]: [
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
        placeholder: "0.00",
        required: true,
        rightSection: <span style={{ color: "#888", fontSize: 14 }}>USD</span>,
      }),
      TextField("gameinFee", "+ 5% gamein fee", {
        value: "0.00",
        rightSection: <span style={{ color: "#888", fontSize: 14 }}>USD</span>,
      }),
      TextField("gameinTax", "+ 15.3% tax = total", {
        value: "0.00",
        rightSection: <span style={{ color: "#888", fontSize: 14 }}>USD</span>,
      }),
      SelectField("paymentType", "Payment method", {
        data: FORM_CONFIG.paymentTypes,
        required: true,
      }),
    ],
    terms: [
      {
        name: "acknowledgement",
        Component: Checkbox,
        required: {
          value: true,
          message: "Please accept the terms before continuing",
        },
        componentProps: {
          label: "Check if you have read and understood the terms of use",
        },
        wrapper: (children) => (
          <Stack key="terms-ack" align="center" gap={10}>
            <Image w={70} h={70} fit="contain" src={TermsAndCondition} alt="Terms and condition icon" />
            <Text fw={600} c="blue.3" align="center">
              community simplified
            </Text>
            <Text ta={"center"}>
              We have implemented a minimum of terms to be agreed on, which
              includes the license, a damage limitation clause and a 50%
              performance bonus
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

const OpportunityFormFields = ({
  control,
  type,
  mode,
  setValue,
  overrideDisabledFields = [],
}) => {
  const isDisabled = useFormDisabled();
  const fields = getFieldConfigs(mode, type);
  const price = useWatch({ control, name: `${type}.choosePrice` });

  useEffect(() => {
    if (!price) return;
    const { fee, total } = calculatePriceBreakdown(price);
    setValue(`${type}.gameinFee`, fee);
    setValue(`${type}.gameinTax`, total);
  }, [price, setValue, type]);

  const getDisabled = (fieldName) => {
    if (fieldName.endsWith("gameinFee") || fieldName.endsWith("gameinTax")) {
      return true;
    }
    if (isDisabled) return true;
    if (mode !== "edit") return false;
    if (overrideDisabledFields.includes("all")) return false;
    const isOverridden = overrideDisabledFields.some((field) =>
      fieldName.endsWith(field)
    );
    if (isOverridden) return false;
    return true;
  };

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
              <FormField
                key={child.name}
                {...child}
                control={control}
                componentProps={{
                  ...child.componentProps,
                  disabled: getDisabled(child.name),
                }}
                inline
              />
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
              componentProps={{
                ...componentProps,
                disabled: getDisabled(fieldName),
              }}
            />
          );

          return wrapper ? wrapper([field]) : field;
        }
      )}
    </OfferingOpportunities>
  );
};

export default OpportunityFormFields;
