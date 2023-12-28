export const getStoreData = (state) => state.store.data || {};
export const getStoreId = (state) => state.store.store_id || "";
export const getStoreProducts = (state) => state.store.products || [];
export const getStoreErrorData = (state) => state.store.errorData || "";
export const getStoreErrorProducts = (state) => state.store.errorProducts || "";
export const getStoreIsLoadingData = (state) =>
    state.store.isLoadingData || false;
export const getStoreIsLoadingProducts = (state) =>
    state.store.isLoadingProducts || false;
