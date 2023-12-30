export const getCourierOrders = (state) => state.courier.orders;
export const getCourierData = (state) => state.courier.data;
export const getCourierId = (state) => state.courier.courier_id || "";
export const getCourierErrorData = (state) => state.courier.errorData || "";
export const getCourierErrorOrders = (state) => state.courier.errorOrders || "";
export const getCourierIsLoadingData = (state) =>
    state.courier.isLoadingData || "";
export const getCourierIsLoadingOrders = (state) =>
    state.courier.isLoadingOrders || "";
