export const formatDateHelper = (dobStr) => {
    if (!dobStr) return "";
    const [year, month, day] = dobStr.split("-");
    return `${month}-${day}-${year}`;
};
