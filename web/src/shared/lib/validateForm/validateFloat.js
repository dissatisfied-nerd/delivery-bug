export const validateFloat = (value) => {
    if (value[0] === ".") {
        return "";
    }
    return value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
};
