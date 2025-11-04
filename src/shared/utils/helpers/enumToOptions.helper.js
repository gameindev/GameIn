export function enumToOptionsHelper(enumObj, labelMap = {}) {
    return Object.values(enumObj).map((val) => ({
        value: val,
        label: labelMap[val],
    }));
}