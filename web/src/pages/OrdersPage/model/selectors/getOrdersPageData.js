export const getOrdersPageData = (state) => state.ordersPage.orders || [];
export const getOrdersPageIsLoading = (state) =>
    state.ordersPage.isLoading || false;
export const getOrdersPageError = (state) => state.ordersPage.error || "";
export const getOrdersPageIsOrderTaken = (state) =>
    state.ordersPage.isOrderTaken || false;
