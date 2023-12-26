export const getProductsPageData = (state) => state.productsPage.products || [];
export const getProductsPageError = (state) => state.productsPage.error || "";
export const getProductsPageIsLoading = (state) =>
    state.productsPage.isLoading || false;
