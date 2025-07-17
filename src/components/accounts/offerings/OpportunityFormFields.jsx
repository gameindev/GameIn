import React from "react";
import {
  Select,
  NumberInput,
  TextInput,
  Textarea,
  Stack,
  Text,
  Checkbox,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Link } from "react-router";
import FormField from "../../shared/ui/FormField";
import { ChevronDown } from "lucide-react";
import { OfferingOpportunities } from "./style";

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
    { value: "15s", label: "15 seconds" },
    { value: "30s", label: "30 seconds" },
    { value: "60s", label: "60 seconds" },
    { value: "90s", label: "90 seconds" },
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
};

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

const FIELD_CONFIGS = {
  streaming: BASE_FIELDS,
  videoCommercial: [
    ...BASE_FIELDS,
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
  ],
  socialMedia: BASE_FIELDS,
  merchProducts: [
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
  price: [
    {
      name: "choosePrice",
      Component: TextInput,
      inline: true,
      componentProps: {
        label: "Choose your price",
        placeholder: "Enter your price",
        type: "number",
        rightSection: <span style={{ color: "#888", fontSize: 14 }}>USD</span>,
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
        rightSection: <span style={{ color: "#888", fontSize: 14 }}>USD</span>,
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
        rightSection: <span style={{ color: "#888", fontSize: 14 }}>USD</span>,
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
        <Stack key={Math.random()}>
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

export default function OpportunityFormFields({ control, type }) {
  const fields = FIELD_CONFIGS[type] || [];

  return (
    <>
      <OfferingOpportunities>
        {fields.map(({ name, Component, componentProps, wrapper, inline }) => {
          const fieldName = `${type}.${name}`;
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
          return wrapper ? wrapper(field) : field;
        })}
      </OfferingOpportunities>
    </>
  );
}
