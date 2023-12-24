import { createSlice } from "@reduxjs/toolkit";
import { PROFILE_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { deleteProduct } from "../services/deleteProduct";

const initialState = {
    isLoading: false,
    data: {
        first_name: "",
        last_name: "",
        father_name: "",
        login: "",
        password: "",
        secret_word: "",
    },
    admin_id: "",
    error: "",
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminData: (state, action) => {
            const { admin_id, ...data } = action.payload;
            state.admin_id = admin_id;
            state.data = data;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
            state.error = "";
        });
        builder.addCase(deleteProduct.fulfilled, (state) => {
            state.isLoading = false;
            state.error = "";
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

// Action creators are generated for each case reducer function
export const { actions: adminActions } = adminSlice;
export const { reducer: adminReducer } = adminSlice;
