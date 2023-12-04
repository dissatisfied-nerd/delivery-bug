import { configureStore } from "@reduxjs/toolkit";
import { clientReducer } from "entities/Client";
import { courierReducer } from "entities/Courier";
import { addAddressReducer } from "features/AddAddress";
import { authReducer } from "features/Auth";
import { cartReducer } from "features/Cart";
import { $api } from "shared/api/api";

const extraArg = {
    api: $api,
};

export const store = configureStore({
    reducer: {
        client: clientReducer,
        courier: courierReducer,
        auth: authReducer,
        cart: cartReducer,
        addAddress: addAddressReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }),
});
