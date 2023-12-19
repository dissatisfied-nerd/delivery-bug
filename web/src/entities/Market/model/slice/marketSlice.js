import { createSlice } from "@reduxjs/toolkit";
import { PROFILE_LOCALSTORAGE_KEY } from "shared/const/localstorage";

const initialState = {
    isLoading: false,
    data: {
        market_name: "",
        first_name: "",
        last_name: "",
        father_name: "",
        login: "",
        city: "",
        street: "",
        building: "",
        entrance: "",
        floor: "",
        apartment: "",
        password: "",
    },
    market_id: "",
    orders: [],
    error: "",
};

export const marketSlice = createSlice({
    name: "market",
    initialState,
    reducers: {
        setMarketData: (state, action) => {
            const { market_id, ...data } = action.payload;
            state.data = data;
            state.market_id = market_id;
        },
    },
});

// Action creators are generated for each case reducer function
export const { actions: marketActions } = marketSlice;
export const { reducer: marketReducer } = marketSlice;
