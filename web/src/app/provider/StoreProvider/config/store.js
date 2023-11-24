import { configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "entities/Profile";
// import { $api } from "shared/api/api";

// const extraArg = {
//     api: $api,
// };

export const store = configureStore({
    reducer: {
        profile: profileReducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         thunk: {
    //             extraArgument: extraArg,
    //         },
    //     }),
});
