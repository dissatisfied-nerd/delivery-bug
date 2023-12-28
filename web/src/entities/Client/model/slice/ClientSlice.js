import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "shared/actions/actions";
import { PROFILE_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { fetchClientData } from "../services/fetchClientData/fetchClientData";
import { fetchClientOrders } from "../services/fetchClientOrders/fetchClientOrders";

const initialState = {
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
    isLoadingData: false,
    isLoadingOrders: false,
    client_id: "",
    orders: [],
    errorData: "",
    errorOrders: "",
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
            .addCase(fetchClientData.pending, (state) => {
                state.isLoadingData = true;
                state.errorData = "";
            })
            .addCase(fetchClientData.rejected, (state, action) => {
                state.isLoadingData = false;
                state.errorData = action.payload;
            })
            .addCase(fetchClientData.fulfilled, (state, action) => {
                state.isLoadingData = false;
                state.errorData = "";
            })
            .addCase(fetchClientOrders.pending, (state) => {
                state.isLoadingOrders = true;
                state.errorOrders = "";
            })
            .addCase(fetchClientOrders.fulfilled, (state, action) => {
                state.isLoadingOrders = false;
                state.orders = action.payload;
                state.errorOrders = "";
            })
            .addCase(fetchClientOrders.rejected, (state, action) => {
                state.isLoadingOrders = false;
                state.errorOrders = action.payload;
            })
            .addCase(revertAll, () => initialState);
    },
});

// Action creators are generated for each case reducer function
export const { actions: clientActions } = clientSlice;
export const { reducer: clientReducer } = clientSlice;
