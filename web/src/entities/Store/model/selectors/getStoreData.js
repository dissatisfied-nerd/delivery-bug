export const getStoreData = (state) => state.store.data || {};
export const getStoreId = (state) => state.store.store_id || "";
export const getStoreProducts = (state) => state.store.products || [];
export const getStoreError = (state) => state.store.error || "";
export const getStoreIsLoadingData = (state) =>
    state.store.isLoadingData || false;
export const getStoreIsLoadingProducts = (state) =>
    state.store.isLoadingProducts || false;
