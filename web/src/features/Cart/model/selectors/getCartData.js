export const getCartData = (state) => state.cart.cart;
export const getCartWeight = (state) => state.cart.weight || "";
export const getCartCount = (state) => state.cart.count || 0;
export const getCartCost = (state) => state.cart.cost || 0;
