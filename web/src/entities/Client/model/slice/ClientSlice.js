import { createSlice } from "@reduxjs/toolkit";
import { PROFILE_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { fetchClientOrders } from "../services/fetchClientOrders/fetchClientOrders";

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
    extraReducers: (builder) => {
        builder
            .addCase(fetchClientOrders.pending, (state) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(fetchClientOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload;
                state.error = "";
            })
            .addCase(fetchClientOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: clientActions } = clientSlice;
export const { reducer: clientReducer } = clientSlice;
