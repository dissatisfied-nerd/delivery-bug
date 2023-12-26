export const getCreateProductData = (state) => state.createProduct.data || {};
export const getCreateProductIsLoading = (state) =>
    state.createProduct.isLoading || false;
export const getCreateProductError = (state) => state.createProduct.error || "";
export const getCreateProductIsProductCreated = (state) =>
    state.createProduct.isProductCreated || false;
