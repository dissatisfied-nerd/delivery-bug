export const validateForm = (data) => {
    console.log(data);
    return (
        Object.values(data).length &&
        Object.values(data).reduce((prev, val) => {
            return prev && !!val;
        }, true)
    );
};
