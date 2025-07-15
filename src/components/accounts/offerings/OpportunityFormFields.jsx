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
import FormField from "../../shared/ui/FormField";
import { DateInput } from "@mantine/dates";
import { Link } from "react-router";

export function OpportunityFormFields({ control, type }) {
  const platforms = [
    { value: "youtube", label: "YouTube" },
    { value: "twitch", label: "Twitch" },
    { value: "kick", label: "Kick" },
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "twitter", label: "X (Twitter)" },
  ];

  const timeModes = [
    { value: "live", label: "Live" },
    { value: "pre-recorded", label: "Pre-recorded" },
    { value: "shoutout", label: "Shout out" },
  ];

  const logoSizes = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

  const durations = [
    { value: "15s", label: "15 seconds" },
    { value: "30s", label: "30 seconds" },
    { value: "60s", label: "60 seconds" },
    { value: "90s", label: "90 seconds" },
    { value: "custom", label: "Custom" },
  ];

  const postTypes = [
    { value: "story", label: "Story" },
    { value: "post", label: "Post" },
    { value: "reel", label: "Reel" },
    { value: "tweet", label: "Tweet" },
  ];

  const PaymentsType = [
    { value: "stripe", label: "Stripe" },
    { value: "paypal", label: "PayPal" },
    { value: "crypto", label: "Crypto" },
  ];

  return (
    <>
      {(type === "streaming" ||
        type === "videoCommercial" ||
        type === "socialMedia") && (
        <>
          <FormField
            name={`${type}.platform`}
            control={control}
            Component={Select}
            inline={true}
            componentProps={{
              data: platforms,
              label: "Platform",
              placeholder: "Select platform",
            }}
          />
          <FormField
            name={`${type}.timeMode`}
            control={control}
            Component={Select}
            inline={true}
            componentProps={{
              data: timeModes,
              label: "Time Mode",
              placeholder: "Select Time Mode",
            }}
          />
          <FormField
            name={`${type}.size`}
            control={control}
            Component={Select}
            inline={true}
            componentProps={{
              data: logoSizes,
              label: "Logo Size",
              placeholder: "Select logo size",
            }}
          />
        </>
      )}

      {type === "videoCommercial" && (
        <>
          <FormField
            name={`${type}.duration`}
            control={control}
            Component={Select}
            inline={true}
            componentProps={{
              data: durations,
              label: "Duration",
              placeholder: "Select duration",
            }}
          />
          <FormField
            name={`${type}.Repetation`}
            control={control}
            Component={NumberInput}
            inline={true}
            componentProps={{
              label: "Repetation",
              placeholder: "Enter number of times",
              min: 0,
            }}
          />
        </>
      )}

      {type === "merchProducts" && (
        <>
          <FormField
            name={`${type}.platform`}
            control={control}
            Component={Select}
            inline={true}
            componentProps={{
              data: platforms,
              label: "Platform",
              placeholder: "Select platform",
            }}
          />
          <FormField
            name={`${type}.timeMode`}
            control={control}
            Component={Select}
            inline={true}
            componentProps={{
              data: timeModes,
              label: "Time Mode",
              placeholder: "Select Time Mode",
            }}
          />
          <FormField
            name={`${type}.types`}
            control={control}
            Component={Select}
            inline={true}
            componentProps={{
              data: postTypes,
              label: "Type",
              placeholder: "Select type of post",
            }}
          />
        </>
      )}

      {type === "dateTitle" && (
        <>
          <FormField
            name="dateTitle.startDate"
            control={control}
            Component={DateInput}
            inline={true}
            componentProps={{
              label: "Start Date",
              placeholder: "Start date",
              valueFormat: "DD/MM/YYYY",
              clearable: true,
            }}
          />
          <FormField
            name="dateTitle.endDate"
            control={control}
            Component={DateInput}
            inline={true}
            componentProps={{
              label: "End Date",
              placeholder: "End date",
              valueFormat: "DD/MM/YYYY",
              clearable: true,
            }}
          />
          <FormField
            name="dateTitle.title"
            control={control}
            Component={TextInput}
            componentProps={{
              label: "Title",
              placeholder: "Enter title",
            }}
          />
          <FormField
            name="dateTitle.description"
            control={control}
            Component={Textarea}
            componentProps={{
              label: "Description",
              placeholder: "Enter description",
            }}
          />
        </>
      )}

      {type === "price" && (
        <>
          <FormField
            name="price.choosePrice"
            control={control}
            Component={TextInput}
            inline={true}
            componentProps={{
              label: "Choose your price",
              placeholder: "Enter your price",
              type: "number",
              rightSection: (
                <span style={{ color: "#888", fontSize: 14 }}>USD</span>
              ),
            }}
          />
          <FormField
            name="price.gaminFee"
            control={control}
            Component={TextInput}
            inline={true}
            componentProps={{
              label: "+ 5% gamein fee",
              disabled: true,
              value: "75.00",
              rightSection: (
                <span style={{ color: "#888", fontSize: 14 }}>USD</span>
              ),
            }}
          />
          <FormField
            name="price.tax"
            control={control}
            Component={TextInput}
            inline={true}
            componentProps={{
              label: "+ 15.3% tax = total",
              disabled: true,
              value: "1.815,98",
              rightSection: (
                <span style={{ color: "#888", fontSize: 14 }}>USD</span>
              ),
            }}
          />

          <FormField
            name={`${type}.paymentType`}
            control={control}
            Component={Select}
            inline={true}
            componentProps={{
              data: PaymentsType,
              label: "Payment method",
              placeholder: "Select method",
            }}
          />
        </>
      )}

      {type === "terms" && (
        <>
          <Stack>
            <Text fw={600} c="blue.3" align="center">
              community simplified
            </Text>
            <Text>
              We have implemented a minimum of terms to be agreed on, which
              includes the license, a damage limitation clause and a 50%
              performance bonus
            </Text>
            <Link>
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
            <FormField
              name="acknowledgement"
              control={control}
              Component={Checkbox}
              componentProps={{
                label: "check if you have read and understood the terms of use",
              }}
            />
          </Stack>
        </>
      )}
    </>
  );
}
