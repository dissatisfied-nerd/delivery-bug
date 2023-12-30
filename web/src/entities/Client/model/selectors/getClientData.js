export const getClientOrders = (state) => state.client.orders;
export const getClientData = (state) => state.client.data;
export const getClientId = (state) => state.client.client_id || "";
export const getClientErrorData = (state) => state.client.errorData || "";
export const getClientErrorOrders = (state) => state.client.errorOrders || "";
export const getClientIsLoadingData = (state) =>
    state.client.isLoadingData || false;
export const getClientIsLoadingOrders = (state) =>
    state.client.isLoadingOrders || false;
