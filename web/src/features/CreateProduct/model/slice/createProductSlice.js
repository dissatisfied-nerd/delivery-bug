import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "shared/actions/actions";
import { sendCreateProductData } from "../services/sendCreateProductData";

const initialState = {
    data: {
        name: "",
        price: "",
        weight: "",
        description: "",
    },
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
    },
    extraReducers: (builder) => {
        builder
            // .addCase(loginByFirstName.pending, (state) => {
            //     state.data.error = undefined;
            //     state.data.isLoading = true;
            // })
            .addCase(sendCreateProductData.fulfilled, (state) => {
                state.error = "";
            })
            .addCase(sendCreateProductData.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(revertAll, () => initialState);
    },
});

// Action creators are generated for each case reducer function
export const { actions: createProductActions } = createProductSlice;
export const { reducer: createProductReducer } = createProductSlice;
