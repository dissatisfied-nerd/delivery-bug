import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "shared/actions/actions";
import { PROFILE_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { deleteProduct } from "../../../../pages/ProductsPage/model/services/deleteProducts/deleteProduct";

const initialState = {
    isLoading: false,
    data: {
        first_name: "",
        last_name: "",
        middle_name: "",
        login: "",
        password: "",
        passphrase: "",
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
        builder.addCase(revertAll, () => initialState);
    },
});

// Action creators are generated for each case reducer function
export const { actions: adminActions } = adminSlice;
export const { reducer: adminReducer } = adminSlice;
