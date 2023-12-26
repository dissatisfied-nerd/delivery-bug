import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "shared/actions/actions";
import { fetchProductsPageData } from "../services/fetchProductsPageData";

const initialState = {
    products: [],
    isLoading: false,
    error: "",
};

export const productsPageSlice = createSlice({
    name: "productsPage",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsPageData.pending, (state, action) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(fetchProductsPageData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.products = action.payload ?? [];
            })
            .addCase(fetchProductsPageData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(revertAll, () => initialState);
    },
});

// Action creators are generated for each case reducer function
export const { actions: productsPageActions } = productsPageSlice;
export const { reducer: productsPageReducer } = productsPageSlice;
