import useApi from "../../../shared/hooks/useApi";
import { USER_ENDPOINTS } from "../api/userEndpoints";
import { showNotificationHelper } from "../../../shared/utils/helpers/showNotification.helper";
import { NOTIFICATION_TYPES } from "../../../shared/enums/notificationTypesEnum";


// TODO: Need to fix this hook later
const useCheckIdentifierExists = () => {
    const { get } = useApi();

    const checkExists = async ({ email, username }) => {
        if (!email && !username) return false;

        const params = new URLSearchParams();
        if (email) params.append("identifier", email);
        if (username) params.append("identifier", username);

        try {
            const { data } = await get({
                url: USER_ENDPOINTS.BY_IDENTIFIER,
                params,
            });
            if (!data) {
                return false;
            }
            return true;
        } catch (err) {
            // showNotificationHelper("Error", "Failed to check identifier exists", NOTIFICATION_TYPES.ERROR);
            return false;
        }
    };

    return { checkExists };
}

export default useCheckIdentifierExists;