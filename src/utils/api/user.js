/* eslint-disable */
export const checkEmailAndUsernameExists = async ({ email, username }) => {
    try {
        const params = new URLSearchParams();
        if (email) params.append("identifier", email);
        if (username) params.append("identifier", username);

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/by-identifier?${params}`);

        if (!response.ok) {
            // Handle known safe response errors
            if (response.status === 404) {
                return false; // User not found → available
            }

            // Try to extract message safely
            let errorMessage = "Unknown error";
            try {
                const errorData = await response.json();
                errorMessage = errorData?.message || errorMessage;
            } catch (parseError) {
                // optional: fallback to status text or silent fail
                errorMessage = response.statusText || "Server error";
            }

            // Log it (optional), then throw
            console.warn(`⚠️ Validation failed [${response.status}]: ${errorMessage}`);
            return false; // Return false if you want to treat invalid query as "available"
            // OR: throw new Error(errorMessage);
        }

        // ✅ Parse and return true if user exists
        const data = await response.json();
        return !!data; // assumes `data` is user object if found

    } catch (error) {
        console.error("❌ Network or unknown error:", error.message || error);
        return false; // Safe fallback
    }
};

