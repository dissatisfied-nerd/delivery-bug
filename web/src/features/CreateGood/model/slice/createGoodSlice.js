import { createSlice } from "@reduxjs/toolkit";
import { sendCreateGoodData } from "../services/sendCreateGoodData";

const initialState = {
    data: {
        name: "",
        price: "",
        weight: "",
        description: "",
    },
    error: "",
};

export const createGoodSlice = createSlice({
    name: "createGood",
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
            .addCase(sendCreateGoodData.fulfilled, (state) => {
                state.error = "";
            })
            .addCase(sendCreateGoodData.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: createGoodActions } = createGoodSlice;
export const { reducer: createGoodReducer } = createGoodSlice;
