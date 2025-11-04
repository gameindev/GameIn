    import { triggerProfileViewApiService } from "../service/profile-view.api.service";
import { useState } from "react";
import { useEffect } from "react";



export const useViewCount = (type, id) => {
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        triggerProfileViewApiService(type, id).then((data) => {
            console.log(data);
            setViewCount(data.view_count);
        });
    }, [type, id]);

    return { viewCount, setViewCount };
}