import { createSlice } from "@reduxjs/toolkit";
import { PROFILE_LOCALSTORAGE_KEY } from "shared/const/localstorage";

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
    orders: [],
    error: "",
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setClientData: (state, action) => {
            const { admin_id, ...data } = action.payload;
            state.admin_id = admin_id;
            state.data = data;
        },
    },
});

// Action creators are generated for each case reducer function
export const { actions: adminActions } = adminSlice;
export const { reducer: adminReducer } = adminSlice;
