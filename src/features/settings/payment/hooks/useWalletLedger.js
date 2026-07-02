import { useCallback, useEffect, useState } from "react";
import walletService from "../services/wallet.service";

export default function useWalletLedger(page = 1, limit = 20) {
    const [ledger, setLedger] = useState({ items: [], total: 0, totalPages: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const refresh = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await walletService.getLedger(page, limit);
            setLedger(data ?? { items: [], total: 0, totalPages: 0 });
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || "Failed to load transactions");
        } finally {
            setLoading(false);
        }
    }, [page, limit]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { ledger, loading, error, refresh };
}
