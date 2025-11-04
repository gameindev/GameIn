import { useEffect, useState } from "react";
import { conversationsService } from "../services/conversation.service";


export function useConversations(userId) {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        conversationsService
            .getConversations(userId)
            .then((data) => {
                if (mounted) setConversations(data);
            })
            .finally(() => mounted && setLoading(false));
        return () => {
            mounted = false;
        };
    }, [userId]);

    return { conversations, loading };
}
