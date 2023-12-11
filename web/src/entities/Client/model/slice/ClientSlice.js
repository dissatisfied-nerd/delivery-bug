import { createSlice } from "@reduxjs/toolkit";
import { PROFILE_LOCALSTORAGE_KEY } from "shared/const/localstorage";

const initialState = {
    isLoading: false,
    data: {
        first_name: "",
        last_name: "",
        login: "",
        city: "",
        street: "",
        building: "",
        entrance: "",
        floor: "",
        apartment: "",
        password: "",
        balance: 0,
    },
    client_id: "",
    orders: [],
    error: "",
};

export const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        setClientData: (state, action) => {
            const { client_id, ...data } = action.payload;
            state.client_id = client_id ? client_id : state.client_id;
            state.data = data;
        },
        logout: (state, action) => {
            state.data = {};
        },
        setClientOrders: (state, action) => {
            state.orders = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loginByFirstName.pending, (state) => {
    //             state.data.error = undefined;
    //             state.data.isLoading = true;
    //         })
    //         .addCase(loginByFirstName.fulfilled, (state) => {
    //             state.data.isLoading = false;
    //         })
    //         .addCase(loginByFirstName.rejected, (state, action) => {
    //             state.data.isLoading = false;
    //             state.data.error = action.payload;
    //         });
    // },
});

// Action creators are generated for each case reducer function
export const { actions: clientActions } = clientSlice;
export const { reducer: clientReducer } = clientSlice;
