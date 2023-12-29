export const getProductDetailsData = (state) => state.productDetails.data;
export const getProductDetailsIsLoading = (state) =>
    state.productDetails.isLoading || false;
export const getProductDetailsError = (state) =>
    state.productDetails.error || "";
