import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "shared/actions/actions";
import { fetchProductData } from "../services/fetchProductData/fetchProductData";

const initialState = {
    data: {
        id: "",
        name: "",
        price: 0,
        weight: 0,
        description: "",
        image: "",
        quantity: 0,
        store_name: "",
    },
    inited: false,
    isLoading: false,
    error: "",
};

export const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState,
    reducers: {
        setInited: (state, action) => {
            state.inited = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductData.pending, (state) => {
                if (state.inited) {
                    state.isLoading = true;
                    state.error = "";
                }
            })
            .addCase(fetchProductData.rejected, (state, action) => {
                if (state.inited) {
                    state.isLoading = false;
                    state.error = action.payload;
                }
            })
            .addCase(fetchProductData.fulfilled, (state, action) => {
                if (state.inited) {
                    state.error = "";
                    state.isLoading = false;
                    state.data = action.payload;
                }
            })
            .addCase(revertAll, () => initialState);
    },
});

// Action creators are generated for each case reducer function
export const { actions: productDetailsActions } = productDetailsSlice;
export const { reducer: productDetailsReducer } = productDetailsSlice;
