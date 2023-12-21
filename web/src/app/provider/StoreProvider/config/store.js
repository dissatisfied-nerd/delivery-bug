import { configureStore } from "@reduxjs/toolkit";
import { adminReducer } from "entities/Admin";
import { clientReducer } from "entities/Client";
import { courierReducer } from "entities/Courier";
import { marketReducer } from "entities/Market";
import { authReducer } from "features/Auth";
import { cartReducer } from "features/Cart";
import { createGoodReducer } from "features/CreateGood";
import { goodsPageReducer } from "pages/GoodsPage";
import { ordersPageReducer } from "pages/OrdersPage";
import { $api } from "shared/api/api";

const extraArg = {
    api: $api,
};

export const store = configureStore({
    reducer: {
        client: clientReducer,
        courier: courierReducer,
        market: marketReducer,
        admin: adminReducer,
        auth: authReducer,
        cart: cartReducer,
        goodsPage: goodsPageReducer,
        ordersPage: ordersPageReducer,
        createGood: createGoodReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }),
});
