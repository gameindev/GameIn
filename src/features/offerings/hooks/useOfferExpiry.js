import { useState, useEffect } from "react";

export function useOfferExpiry(lastAdjustedAt) {
  const [expired, setExpired] = useState(true);

  useEffect(() => {
    if (!lastAdjustedAt) return;
    setExpired(false);
    const expiry = new Date(lastAdjustedAt).getTime() + 24 * 60 * 60 * 1000;

    const check = () => {
      const now = Date.now();
      if (now >= expiry) {
        setExpired(true);
        clearInterval(timer);
      }
    };

    const timer = setInterval(check, 1000);
    check();

    return () => clearInterval(timer);
  }, [lastAdjustedAt]);

  return { expired };
}
