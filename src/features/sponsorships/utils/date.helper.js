export const getTimeRemaining = (futureDateString) => {
    if (!futureDateString) return "—";

    const target = new Date(futureDateString);
    const now = new Date();
    const diff = target - now;

    if (isNaN(target.getTime())) return "Invalid date";
    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${String(days).padStart(2, "0")}d ${String(hours).padStart(
        2,
        "0"
    )}h ${String(minutes).padStart(2, "0")}m`;
};

export const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
