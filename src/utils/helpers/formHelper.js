import React from "react";
import { Select, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconChevronDown } from "@tabler/icons-react";

export const DEFAULT_FIELD_WIDTH = "7.5rem";

export const createField =
  (Component, baseDefaults = {}) =>
  (name, label, extra = {}) => ({
    name,
    Component,
    inline: true,
    required: !!extra.required,
    componentProps: {
      label,
      style: { width: DEFAULT_FIELD_WIDTH, ...(extra.style || {}) },
      placeholder: extra.placeholder || `Enter ${label.toLowerCase()}`,
      ...baseDefaults,
      ...extra,
    },
  });

export const SelectField = createField(Select, {
  rightSection: React.createElement(IconChevronDown, { size: "1em" }),
});

export const TextField = createField(TextInput);

export const DateField = createField(DateInput, {
  placeholder: "Select date",
  valueFormat: "DD/MM/YYYY",
  clearable: true,
  minDate: new Date(),
});

export const calculatePriceBreakdown = (price) => {
  const numericPrice = parseFloat(price);
  if (isNaN(numericPrice)) {
    return { fee: "0.00", tax: "0.00", total: "0.00" };
  }

  const fee = (numericPrice * 0.05).toFixed(2);
  const tax = (numericPrice * 0.153).toFixed(2);
  const total = (numericPrice + parseFloat(fee) + parseFloat(tax)).toFixed(2);

  return { fee, tax, total };
};
