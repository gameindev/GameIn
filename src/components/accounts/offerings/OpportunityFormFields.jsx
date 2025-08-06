import React from "react";
import {
  Select,
  NumberInput,
  TextInput,
  Textarea,
  Stack,
  Text,
  Checkbox,
  Flex,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import FormField from "../../shared/ui/FormField";
import { InlineFields, OfferingOpportunities } from "./style";

const FORM_CONFIG = {
  platforms: [
    { value: "youtube", label: "YouTube" },
    { value: "twitch", label: "Twitch" },
    { value: "kick", label: "Kick" },
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "twitter", label: "X (Twitter)" },
  ],
  timeModes: [
    { value: "live", label: "Live" },
    { value: "pre-recorded", label: "Pre-recorded" },
    { value: "shoutout", label: "Shout out" },
  ],
  logoSizes: [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ],
  durations: [
    { value: "15s", label: "15s" },
    { value: "30s", label: "30s" },
    { value: "60s", label: "60s" },
    { value: "90s", label: "90s" },
    { value: "custom", label: "Custom" },
  ],
  postTypes: [
    { value: "story", label: "Story" },
    { value: "post", label: "Post" },
    { value: "reel", label: "Reel" },
    { value: "tweet", label: "Tweet" },
  ],
  paymentTypes: [
    { value: "stripe", label: "Stripe" },
    { value: "paypal", label: "PayPal" },
    { value: "crypto", label: "Crypto" },
  ],
  eventTypes: [
    { value: "tournament", label: "Tournament" },
    { value: "league", label: "League" },
    { value: "event", label: "Event" },
  ],
  chooseGame: [
    { value: "game1", label: "Game 1" },
    { value: "game2", label: "Game 2" },
    { value: "game3", label: "Game 3" },
  ],
};

const getFieldConfigs = (mode, type) => {
  const BASE_FIELDS = [
    {
      name: "platform",
      Component: Select,
      inline: true,
      componentProps: {
        data: FORM_CONFIG.platforms,
        label: "Platform",
        placeholder: "Select platform",
        rightSection: <ChevronDown size="1em" />,
        style: { width: "7.5rem" },
      },
    },
    {
      name: "timeMode",
      Component: Select,
      inline: true,
      componentProps: {
        data: FORM_CONFIG.timeModes,
        label: "Time Mode",
        placeholder: "Select Time Mode",
        rightSection: <ChevronDown size="1em" />,
        style: { width: "7.5rem" },
      },
    },
    ...(mode === "edit" && type !== "videoCommercial"
      ? [
          {
            name: "schedule",
            Component: TextInput,
            inline: true,
            componentProps: {
              label: "Schedule",
              placeholder: "Mon - Fri",
              style: { width: "7.5rem" },
            },
          },
        ]
      : []),
    {
      name: "size",
      Component: Select,
      inline: true,
      componentProps: {
        data: FORM_CONFIG.logoSizes,
        label: "Logo Size",
        placeholder: "Select logo size",
        rightSection: <ChevronDown size="1em" />,
        style: { width: "7.5rem" },
      },
    },
  ];

  return {
    streaming: BASE_FIELDS,
    videoCommercial: [
      ...BASE_FIELDS,
      ...(mode === "edit"
        ? [
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
                    styles: {
                      input: { width: "3rem", textAlign: "center" },
                    },
                  },
                },
                {
                  name: "videoCommercial.duration",
                  Component: Select,
                  componentProps: {
                    data: FORM_CONFIG.durations,
                    placeholder: "sec",
                    styles: {
                      input: { width: "4rem", textAlign: "center" },
                    },
                  },
                },
              ],
              wrapper: (children) => (
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  spacing={4}
                  key="videoCommercial.repetitionDuration"
                >
                  <Text>Repetition / Duration</Text>
                  <InlineFields>
                    <Flex spacing={4} align="center" direction="row">
                      {children[0]}
                      <Text component="span" size="sm" fw={600} c="dimmed">
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
            {
              name: "duration",
              Component: Select,
              inline: true,
              componentProps: {
                data: FORM_CONFIG.durations,
                label: "Duration",
                placeholder: "Select duration",
                rightSection: <ChevronDown size="1em" />,
                style: { width: "7.5rem" },
              },
            },
            {
              name: "repetation",
              Component: NumberInput,
              inline: true,
              componentProps: {
                label: "Repetation",
                placeholder: "Enter number of times",
                min: 0,
                style: { width: "7.5rem" },
              },
            },
          ]),
    ],
    socialMedia: BASE_FIELDS,
    merchProducts: [
      ...BASE_FIELDS.slice(0, 2),
      {
        name: "types",
        Component: Select,
        inline: true,
        componentProps: {
          data: FORM_CONFIG.postTypes,
          label: "Type",
          placeholder: "Select type of post",
          rightSection: <ChevronDown size="1em" />,
          style: { width: "7.5rem" },
        },
      },
    ],
    dateTitle: [
      {
        name: "startDate",
        Component: DateInput,
        inline: true,
        componentProps: {
          label: "Start Date",
          placeholder: "Start date",
          valueFormat: "DD/MM/YYYY",
          clearable: true,
          style: { width: "7.5rem" },
        },
      },
      {
        name: "endDate",
        Component: DateInput,
        inline: true,
        componentProps: {
          label: "End Date",
          placeholder: "End date",
          valueFormat: "DD/MM/YYYY",
          clearable: true,
          style: { width: "7.5rem" },
        },
      },
      {
        name: "title",
        Component: TextInput,
        inline: false,
        componentProps: {
          label: "Title",
          placeholder: "Enter title",
          style: { width: "100%" },
        },
      },
      {
        name: "description",
        Component: Textarea,
        inline: false,
        componentProps: {
          label: "Description",
          placeholder: "Enter description",
          style: { width: "100%" },
        },
      },
    ],
    pricePoolTitle: [
      {
        name: "title",
        Component: Textarea,
        inline: false,
        componentProps: {
          label: "Title",
          placeholder: "Enter title",
          style: { width: "100%" },
        },
      },
      {
        name: "description",
        Component: Textarea,
        inline: false,
        componentProps: {
          label: "Description",
          placeholder: "Enter description",
          style: { width: "100%" },
        },
      },
    ],
    editInfos: [
      {
        name: "streamingPlatform",
        Component: TextInput,
        inline: true,
        componentProps: {
          label: "Streaming Platform",
          style: { width: "7.5rem" },
        },
      },
      {
        name: "eventType",
        Component: Select,
        inline: true,
        componentProps: {
          data: FORM_CONFIG.eventTypes,
          label: "Event Type",
          placeholder: "Select type of post",
          rightSection: <ChevronDown size="1em" />,
          style: { width: "7.5rem" },
        },
      },
      {
        name: "eventStartDate",
        Component: DateInput,
        inline: true,
        componentProps: {
          label: "Event Starting",
          placeholder: "Start date",
          valueFormat: "DD/MM/YYYY",
          clearable: true,
          style: { width: "7.5rem" },
        },
      },
      {
        name: "eventEndDate",
        Component: DateInput,
        inline: true,
        componentProps: {
          label: "Event Ending",
          placeholder: "End date",
          valueFormat: "DD/MM/YYYY",
          clearable: true,
          style: { width: "7.5rem" },
        },
      },
      {
        name: "chooseGame",
        Component: Select,
        inline: true,
        componentProps: {
          data: FORM_CONFIG.chooseGame,
          label: "Choose Game",
          placeholder: "Select type of post",
          rightSection: <ChevronDown size="1em" />,
          style: { width: "7.5rem" },
        },
      },
      {
        name: "estimatedViewCount",
        Component: TextInput,
        inline: true,
        componentProps: {
          label: "Estimated View Count",
          placeholder: "Enter title",
          style: { width: "7.5rem" },
        },
      },
    ],
    price: [
      {
        name: "choosePrice",
        Component: TextInput,
        inline: true,
        componentProps: {
          label: "Choose your price",
          placeholder: "Enter your price",
          type: "number",
          rightSection: (
            <span style={{ color: "#888", fontSize: 14 }}>USD</span>
          ),
          style: { width: "7.5rem" },
        },
      },
      {
        name: "gameinFee",
        Component: TextInput,
        inline: true,
        componentProps: {
          label: "+ 5% gamein fee",
          disabled: true,
          value: "75.00",
          rightSection: (
            <span style={{ color: "#888", fontSize: 14 }}>USD</span>
          ),
          style: { width: "7.5rem" },
        },
      },
      {
        name: "gameinTax",
        Component: TextInput,
        inline: true,
        componentProps: {
          label: "+ 15.3% tax = total",
          disabled: true,
          value: "1.815,98",
          rightSection: (
            <span style={{ color: "#888", fontSize: 14 }}>USD</span>
          ),
          style: { width: "7.5rem" },
        },
      },
      {
        name: "paymentType",
        Component: Select,
        inline: true,
        componentProps: {
          data: FORM_CONFIG.paymentTypes,
          label: "Payment method",
          placeholder: "Select method",
          rightSection: <ChevronDown size="1em" />,
          style: { width: "7.5rem" },
        },
      },
    ],
    terms: [
      {
        name: "acknowledgement",
        Component: Checkbox,
        componentProps: {
          label: "check if you have read and understood the terms of use",
        },
        wrapper: (children) => (
          <Stack key="terms-ack">
            <Text fw={600} c="blue.3" align="center">
              community simplified
            </Text>
            <Text>
              We have implemented a minimum of terms to be agreed on, which
              includes the license, a damage limitation clause and a 50%
              performance bonus ciplinary
            </Text>
            <Link to="/terms-of-use" style={{ textDecoration: "none" }}>
              <Text
                size="sm"
                align="center"
                fw={600}
                c="white"
                style={{ cursor: "pointer" }}
              >
                read more
              </Text>
            </Link>
            {children}
          </Stack>
        ),
      },
    ],
  };
};

export default function OpportunityFormFields({ control, type, mode }) {
  const fields = getFieldConfigs(mode, type)[type] || [];

  const renderWrappedFields = ({ wrapper, wrapperFields }) => {
    const children = wrapperFields.map((child) => (
      <FormField
        key={child.name}
        name={child.name.includes(".") ? child.name : `${type}.${child.name}`}
        control={control}
        Component={child.Component}
        inline={true}
        componentProps={child.componentProps}
      />
    ));
    return wrapper(children);
  };

  return (
    <OfferingOpportunities>
      {fields.map((fieldConfig) => {
        const {
          name,
          Component,
          componentProps,
          wrapper,
          wrapperFields,
          inline,
        } = fieldConfig;

        if (wrapper && wrapperFields) {
          return renderWrappedFields({ wrapper, wrapperFields });
        }

        const fieldName = name.includes(".") ? name : `${type}.${name}`;

        const field = (
          <FormField
            key={fieldName}
            name={fieldName}
            control={control}
            Component={Component}
            inline={inline}
            componentProps={componentProps}
          />
        );

        return wrapper ? wrapper([field]) : field;
      })}
    </OfferingOpportunities>
  );
}
