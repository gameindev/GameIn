import { useEffect, useState, useRef, useCallback } from "react";

// Constants for expiry calculation
const EXPIRY_HOURS = 24;
const EXPIRY_MS = EXPIRY_HOURS * 60 * 60 * 1000;

export const useOfferExpiry = (lastAdjustedAt, onExpire) => {
    const [expired, setExpired] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(null);
    const hasTriggeredRef = useRef(false);
    const timeoutRef = useRef();
    const intervalRef = useRef();
    const onExpireRef = useRef(onExpire);

    // Store latest onExpire callback in ref to avoid recreating interval
    useEffect(() => {
        onExpireRef.current = onExpire;
    }, [onExpire]);

    // Calculate expiry time (24 hours from lastAdjustedAt)
    const calculateExpiryTime = useCallback((lastAdjustedAt) => {
        if (!lastAdjustedAt) return null;
        const lastAdjustedAtMs = new Date(lastAdjustedAt).getTime();
        return lastAdjustedAtMs + EXPIRY_MS;
    }, []);

    // Calculate and format time remaining
    const calculateTimeRemaining = useCallback((expiryTimeMs) => {
        const diff = expiryTimeMs - Date.now();
        if (diff <= 0) return "Expired";

        const h = String(Math.floor(diff / 1000 / 60 / 60)).padStart(2, "0");
        const m = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, "0");
        const s = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
        return `${h}h ${m}m ${s}s`;
    }, []);

    useEffect(() => {
        if (!lastAdjustedAt) {
            setExpired(false);
            setTimeRemaining(null);
            hasTriggeredRef.current = false;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

        const expiryTimeMs = calculateExpiryTime(lastAdjustedAt);
        const timeUntilExpiry = expiryTimeMs - Date.now();

        // Update time remaining immediately
        const updateTimeRemaining = () => {
            const remaining = calculateTimeRemaining(expiryTimeMs);
            setTimeRemaining(remaining);
            const isExpired = remaining === "Expired";
            setExpired(isExpired);
            
            if (isExpired && !hasTriggeredRef.current) {
                hasTriggeredRef.current = true;
                onExpireRef.current?.();
            }
        };

        updateTimeRemaining();

        // Update every second for display
        intervalRef.current = setInterval(updateTimeRemaining, 1000);

        if (timeUntilExpiry <= 0) {
            setExpired(true);
            if (!hasTriggeredRef.current) {
                hasTriggeredRef.current = true;
                onExpireRef.current?.();
            }
            return;
        }

        setExpired(false);
        hasTriggeredRef.current = false;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setExpired(true);
            if (!hasTriggeredRef.current) {
                hasTriggeredRef.current = true;
                onExpireRef.current?.();
            }
        }, timeUntilExpiry);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [lastAdjustedAt, calculateExpiryTime, calculateTimeRemaining]);

    return { expired, timeRemaining };
};
