import { createSlice } from "@reduxjs/toolkit";
import { PROFILE_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { fetchMarketData } from "../services/fetchMarketData/fetchMarketData";

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
    products: [],
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchMarketData.pending, (state) => {
                state.error = "";
                state.isLoading = true;
            })
            .addCase(fetchMarketData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.data = action.payload.market;
            })
            .addCase(fetchMarketData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: marketActions } = marketSlice;
export const { reducer: marketReducer } = marketSlice;
