const sanitize = (value) =>
    typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";

const getInitials = ({ firstName, lastName, displayName } = {}) => {
    const safeFirstName = sanitize(firstName);
    const safeLastName = sanitize(lastName);

    if (safeFirstName || safeLastName) {
        const initials = `${safeFirstName[0] || ""}${safeLastName[0] || ""}`;
        return initials ? initials.toUpperCase() : "?";
    }

    const name = sanitize(displayName);
    if (!name) return "?";

    const parts = name.split(" ").filter(Boolean);
    const firstInitial = parts[0]?.[0] || "";
    const lastInitial = parts.length > 1 ? parts[parts.length - 1][0] : "";
    const initials = `${firstInitial}${lastInitial}`;

    return initials ? initials.toUpperCase() : "?";
};

export default getInitials;
