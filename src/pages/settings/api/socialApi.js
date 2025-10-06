/* eslint-disable */
import useApi from "../../../hooks/useApi";
import { API_PATHS } from "../../../services/endpoints";

export function useSocialApi() {
    const { get, post } = useApi();

    return {      

        checkAllConnections: async () => {
            const res = await get({
                url: API_PATHS.SETTINGS.SOCIAL.CHECK_ALL
            })

            return res?.data || []
        },


        connect: async (platform) => {
            const res = await get({
                url: API_PATHS.SETTINGS.SOCIAL.CONNECT(platform),
            })

            return res?.data || []
        }


    };
}
