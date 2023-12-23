import { configureStore } from "@reduxjs/toolkit";
import { adminReducer } from "entities/Admin";
import { clientReducer } from "entities/Client";
import { courierReducer } from "entities/Courier";
import { storeReducer } from "entities/Store";
import { authReducer } from "features/Auth";
import { cartReducer } from "features/Cart";
import { createProductReducer } from "features/CreateProduct";
import { productsPageReducer } from "pages/ProductsPage";
import { ordersPageReducer } from "pages/OrdersPage";
import { $api } from "shared/api/api";

const extraArg = {
    api: $api,
};

export const store = configureStore({
    reducer: {
        client: clientReducer,
        courier: courierReducer,
        store: storeReducer,
        admin: adminReducer,
        auth: authReducer,
        cart: cartReducer,
        productsPage: productsPageReducer,
        ordersPage: ordersPageReducer,
        createProduct: createProductReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }),
});
