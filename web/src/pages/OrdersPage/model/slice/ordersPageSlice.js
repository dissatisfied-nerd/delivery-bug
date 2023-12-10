import { createSlice } from "@reduxjs/toolkit";
import { fetchOrdersPageData } from "../services/fetchOrdersPageData";

const initialState = {
    orders: [],
    error: "",
};

export const ordersPageSlice = createSlice({
    name: "ordersPage",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrdersPageData.fulfilled, (state, action) => {
                state.orders = action.payload ?? [];
                state.error = "";
            })
            .addCase(fetchOrdersPageData.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: ordersPageActions } = ordersPageSlice;
export const { reducer: ordersPageReducer } = ordersPageSlice;
