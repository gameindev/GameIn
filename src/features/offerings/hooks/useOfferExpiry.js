import { useState, useEffect } from "react";

export function useOfferExpiry(lastAdjustedAt) {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    if (!lastAdjustedAt) return;

    const calculateRemaining = () => {
      const expiry = new Date(lastAdjustedAt).getTime() + 24 * 60 * 60 * 1000;
      const now = Date.now();
      const diff = expiry - now;

      if (diff <= 0) return null;

      const h = Math.floor(diff / 1000 / 60 / 60);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);
      return `${h}h ${m}m ${s}s`;
    };

    setTimeRemaining(calculateRemaining());

    const timer = setInterval(() => {
      const remaining = calculateRemaining();
      if (!remaining) {
        clearInterval(timer);
        setTimeRemaining("Expired");
      } else {
        setTimeRemaining(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastAdjustedAt]);

  return timeRemaining;
}
