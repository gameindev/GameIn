import React, { useEffect, useState } from "react";
import { Text } from "@mantine/core";
import { theme } from "./../../../styles/theme/customTheme";
import { useOfferExpiry } from "./../hooks/useOfferExpiry";

export default function ExpiryTimer({ lastAdjustedAt }) {
  const [timeRemaining, setTimeRemaining] = useState("Expired");

  const { expired } = useOfferExpiry(lastAdjustedAt);

  useEffect(() => {
    if (!lastAdjustedAt) return;

    const expiry = new Date(lastAdjustedAt).getTime() + 24 * 60 * 60 * 1000;

    const calculate = () => {
      const diff = expiry - Date.now();
      if (diff <= 0) return "Expired";

      const h = String(Math.floor(diff / 1000 / 60 / 60)).padStart(2, "0");
      const m = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, "0");
      const s = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
      return `${h}h ${m}m ${s}s`;
    };

    const tick = () => setTimeRemaining(calculate());
    tick();
    const timer = setInterval(tick, 1000);

    return () => clearInterval(timer);
  }, [lastAdjustedAt]);

  return (
    <Text fz="lg" align="right">
      Time Remaining:
      <br aria-hidden="true" />
      <Text
        component="span"
        c={expired ? "red" : theme.colors.primary[0]}
        fw={700}
      >
        {" "}
        {timeRemaining}
      </Text>
    </Text>
  );
}
