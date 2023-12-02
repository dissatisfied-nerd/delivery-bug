export const validateForm = (data) => {
    return (
        Object.values(data).length &&
        Object.values(data).reduce((prev, val) => {
            return prev && !!val;
        }, true)
    );
};
