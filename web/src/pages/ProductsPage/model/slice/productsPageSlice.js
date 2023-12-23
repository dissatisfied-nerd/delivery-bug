import { createSlice } from "@reduxjs/toolkit";
import { fetchProductsPageData } from "../services/fetchProductsPageData";

const initialState = {
    products: [],
};

export const productsPageSlice = createSlice({
    name: "productsPage",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProductsPageData.fulfilled, (state, action) => {
            state.products = action.payload ?? [];
        });
    },
});

// Action creators are generated for each case reducer function
export const { actions: productsPageActions } = productsPageSlice;
export const { reducer: productsPageReducer } = productsPageSlice;
