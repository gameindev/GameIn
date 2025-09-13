import React from "react";
import {
  Select,
  NumberInput,
  TextInput,
  Textarea,
  Checkbox,
  Flex,
  Stack,
  Text,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import FormField from "../../shared/ui/FormField";
import { InlineFields, OfferingOpportunities } from "./style";

const FORM_CONFIG = {
  platforms: [
    { value: "twitch", label: "Twitch" },
    { value: "instagram", label: "Instagram" },
    { value: "x", label: "X (Twitter)" },
    { value: "youtube", label: "YouTube" },
    { value: "tiktok", label: "TikTok" },
    { value: "discord", label: "Discord" },
    { value: "kick", label: "Kick" },
    { value: "facebook", label: "Facebook" },
    { value: "snapchat", label: "Snapchat" },
    { value: "pinterest", label: "Pinterest" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "threads", label: "Threads" },
    { value: "others", label: "Others" },
  ],
  durations: [
    { value: "15s", label: "15s" },
    { value: "30s", label: "30s" },
    { value: "60s", label: "60s" },
    { value: "90s", label: "90s" },
    { value: "custom", label: "Custom" },
  ],
  postTypes: [
    { value: "clothing", label: "Clothing" },
    { value: "accessories", label: "Accessories" },
    { value: "gamingGear", label: "Gaming Gear" },
    { value: "inGameItems", label: "In-Game Items" },
    { value: "beautyWellness", label: "Beauty & Wellness" },
    { value: "collectibles", label: "Collectibles" },
    { value: "digitalProducts", label: "Digital Products" },
    { value: "custom", label: "Custom" },
  ],
  paymentTypes: [
    { value: "stripe", label: "Stripe" },
    { value: "paypal", label: "PayPal" },
    { value: "razorpay", label: "RazorPay" },
    { value: "manual", label: "Manual" },
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

const TIME_MODE_CONFIG = {
  streaming: [
    { value: "timespan", label: "Time span" },
    { value: "starttoend", label: "Start to End" },
    { value: "perhour", label: "Per Hour" },
    { value: "eventtrigger", label: "Event Trigger" },
    { value: "fixedfrequency", label: "Fixed Frequency" },
  ],
  videoCommercial: [
    { value: "shoutout", label: "Shoutout" },
    { value: "adsegment", label: "Ad Segment" },
    { value: "productreview", label: "Product Review" },
    { value: "visualOverlay", label: "Visual Overlay" },
    { value: "sponsored", label: "Sponser Intro/Outro" },
    { value: "custom", label: "custom" },
  ],
  socialMedia: [
    { value: "timespan", label: "Time span" },
    { value: "introonly", label: "Intro Only" },
    { value: "outroonly", label: "Outro Only" },
    { value: "flashmention", label: "Flash Mention" },
    { value: "pinnedoverlay", label: "Pinned Overlay" },
    { value: "hashtagonly", label: "Hashtag Only" },
    { value: "custom", label: "custom" },
  ],
  merchProducts: [
    { value: "timespan", label: "Time span" },
    { value: "introonly", label: "Intro Only" },
    { value: "outroonly", label: "Outro Only" },
    { value: "singleappr", label: "Single Appearance" },
    { value: "highlightmom", label: "Highlight Moment" },
    { value: "pinnedpost", label: "Pinned Post/Tag" },
    { value: "custom", label: "custom" },
  ],
  default: [
    { value: "live", label: "Live" },
    { value: "pre-recorded", label: "Pre-recorded" },
    { value: "shoutout", label: "Shout out" },
  ],
};

const LOGO_SIZES_CONFIG = {
  streaming: [
    { value: "100px", label: "100px" },
    { value: "150px", label: "150px" },
    { value: "200px", label: "200px" },
    { value: "250px", label: "250px" },
    { value: "300px", label: "300px" },
    { value: "fullwidth", label: "Full Width" },
    { value: "custom", label: "Custom" },
  ],
  videoCommercial: [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "wide", label: "Wide" },
    { value: "fullscreen", label: "Full Screen" },
    { value: "custom", label: "Custom" },
  ],
  socialMedia: [
    { value: "portrait", label: "Portrait" },
    { value: "square", label: "Square" },
    { value: "landscape", label: "Landscape" },
    { value: "smallbadge", label: "Small Badge" },
    { value: "fulltakeover", label: "FullScreen Takeover" },
    { value: "custom", label: "Custom" },
  ],
  merchProducts: [],
  default: [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ],
};

const SelectField = (name, label, data, extra = {}) => ({
  name,
  Component: Select,
  inline: true,
  required: extra.required || false,
  componentProps: {
    data,
    label,
    placeholder: `Select ${label.toLowerCase()}`,
    rightSection: <ChevronDown size="1em" />,
    style: { width: "7.5rem" },
    ...extra,
  },
});

const TextField = (name, label, extra = {}) => {
  const hasValue = extra.value !== undefined;
  return {
    name,
    Component: TextInput,
    inline: true,
    required: extra.required || false,
    componentProps: {
      label,
      style: { width: "7.5rem" },
      placeholder: hasValue ? undefined : `Enter ${label.toLowerCase()}`,
      ...(hasValue ? { defaultValue: extra.value } : {}),
      ...extra,
    },
  };
};

const DateField = (name, label, extra = {}) => ({
  name,
  Component: DateInput,
  inline: true,
  required: extra.required || false,
  componentProps: {
    label,
    placeholder: label,
    valueFormat: "DD/MM/YYYY",
    clearable: true,
    style: { width: "7.5rem" },
  },
});

// Field configs generator
const getFieldConfigs = (mode, type) => {
  const BASE_FIELDS = [
    SelectField("platform", "Platform", FORM_CONFIG.platforms),
    SelectField(
      "timeMode",
      "Time Mode",
      TIME_MODE_CONFIG[type] || TIME_MODE_CONFIG.default
    ),
    ...(mode === "edit" && type !== "videoCommercial"
      ? [TextField("schedule", "Schedule", { placeholder: "Mon - Fri" })]
      : []),
    SelectField(
      "size",
      "Logo Size",
      LOGO_SIZES_CONFIG[type] || LOGO_SIZES_CONFIG.default
    ),
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
                  Component: Select,
                  componentProps: {
                    data: FORM_CONFIG.durations,
                    placeholder: "sec",
                    styles: { input: { width: "4rem", textAlign: "center" } },
                  },
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
            SelectField("duration", "Duration", FORM_CONFIG.durations),
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
      ...BASE_FIELDS.slice(0, 2),
      SelectField("types", "Type", FORM_CONFIG.postTypes),
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
    pricePoolTitle: [
      {
        name: "title",
        Component: Textarea,
        componentProps: {
          label: "Title",
          placeholder: "Enter title",
          style: { width: "100%" },
        },
      },
      {
        name: "description",
        Component: Textarea,
        componentProps: {
          label: "Description",
          placeholder: "Enter description",
          style: { width: "100%" },
        },
      },
    ],
    editInfos: [
      TextField("streamingPlatform", "Streaming Platform"),
      SelectField("eventType", "Event Type", FORM_CONFIG.eventTypes),
      DateField("eventStartDate", "Event Starting"),
      DateField("eventEndDate", "Event Ending"),
      SelectField("chooseGame", "Choose Game", FORM_CONFIG.chooseGame),
      TextField("estimatedViewCount", "Estimated View Count"),
    ],
    price: [
      TextField("choosePrice", "Choose your price", {
        type: "number",
        rightSection: <span style={{ color: "#888", fontSize: 14 }}>USD</span>,
      }),
      TextField("+gameinFee", "+ 5% gamein fee", {
        disabled: true,
        value: "75.00",
        rightSection: <span style={{ color: "#888", fontSize: 14 }}>USD</span>,
      }),
      TextField("+gameinTax", "+ 15.3% tax = total", {
        disabled: true,
        value: "1.815,98",
        rightSection: <span style={{ color: "#888", fontSize: 14 }}>USD</span>,
      }),
      SelectField("paymentType", "Payment method", FORM_CONFIG.paymentTypes),
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

export default function OpportunityFormFields({ control, type, mode }) {
  const fields = getFieldConfigs(mode, type);

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
                name={child.name}
                control={control}
                Component={child.Component}
                inline
                required={child.required || false}
                componentProps={child.componentProps}
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
              required={required || false}
              componentProps={componentProps}
            />
          );

          return wrapper ? wrapper([field]) : field;
        }
      )}
    </OfferingOpportunities>
  );
}
