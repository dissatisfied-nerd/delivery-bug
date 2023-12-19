export const getOrdersPageData = (state) => state.ordersPage.orders || [];
export const getOrdersPageError = (state) => state.ordersPage.error || "";
export const getOrdersPageIsOrderTaken = (state) =>
    state.ordersPage.isOrderTakn || false;
