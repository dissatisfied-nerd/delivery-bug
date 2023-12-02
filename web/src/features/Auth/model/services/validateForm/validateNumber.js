export const validateNumber = (data) => Number(data?.replace(/\D/gm, "")) || "";
