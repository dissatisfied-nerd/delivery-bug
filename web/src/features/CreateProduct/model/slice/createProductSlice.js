import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "shared/actions/actions";
import { sendCreateProductData } from "../services/sendCreateProductData";

const initialState = {
    data: {
        name: "",
        price: "",
        weight: "",
        quantity: "",
        description: "",
    },
    isLoading: false,
    isProductCreated: false,
    error: "",
};

export const createProductSlice = createSlice({
    name: "createProduct",
    initialState,
    reducers: {
        changeData: (state, action) => {
            state.data = {
                ...state.data,
                ...action.payload,
            };
        },
        setIsProductCreated: (state, action) => {
            state.isProductCreated = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendCreateProductData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(sendCreateProductData.fulfilled, (state) => {
                state.error = "";
                state.data = initialState.data;
                state.isProductCreated = true;
                state.isLoading = false;
            })
            .addCase(sendCreateProductData.rejected, (state, action) => {
                state.error = action.payload;
                state.isProductCreated = false;
                state.isLoading = false;
            })
            .addCase(revertAll, () => initialState);
    },
});

// Action creators are generated for each case reducer function
export const { actions: createProductActions } = createProductSlice;
export const { reducer: createProductReducer } = createProductSlice;
