export const getFormatedData = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
};
