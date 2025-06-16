import useApi from "./useApi";
import { API_PATHS } from "../services/endpoints";

const useCheckIdentifierExists = () => {
  const { get } = useApi();

  const checkExists = async ({ email, username }) => {
    if (!email && !username) return false;

    const params = new URLSearchParams();
    if (email) params.append("identifier", email);
    if (username) params.append("identifier", username);

    try {
      const data = await get(`${API_PATHS.USERS.BY_IDENTIFIER}?${params}`);
      return !!data;
    } catch (err) {
      console.error("Identifier check failed:", err);
      return false;
    }
  };

  return { checkExists };
};

export default useCheckIdentifierExists;
