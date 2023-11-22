import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "features/Auth";
// import { $api } from "shared/api/api";

// const extraArg = {
//     api: $api,
// };

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         thunk: {
    //             extraArgument: extraArg,
    //         },
    //     }),
});
