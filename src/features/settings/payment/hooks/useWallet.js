import { useCallback, useEffect, useState } from "react";
import walletService from "../services/wallet.service";

export default function useWallet() {
    const [wallet, setWallet] = useState(null);
    const [balances, setBalances] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refresh = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await walletService.getMyWallet();
            setWallet(data?.wallet ?? data);
            setBalances(data?.balances ?? null);
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || "Failed to load wallet");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { wallet, balances, loading, error, refresh };
}
