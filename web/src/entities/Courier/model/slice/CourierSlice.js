import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "shared/actions/actions";
import { PROFILE_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { fetchCourierData } from "../services/fetchCourierData/fetchCourierData";
import { fetchCourierOrders } from "../services/fetchCourierOrders/fetchCourierOrders";

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
    },
    isLoadingData: false,
    isLoadingOrders: false,
    courier_id: "",
    orders: [],
    errorData: "",
    errorOrders: "",
};

export const courierSlice = createSlice({
    name: "courier",
    initialState,
    reducers: {
        setCourierData: (state, action) => {
            const { courier_id, ...data } = action.payload;
            state.courier_id = courier_id;
            state.data = data;
        },
        // addOrder: (state, action) => {
        //     state.orders = [...state.orders, action.payload];
        // },
        setCourierOrders: (state, action) => {
            state.orders = action.payload;
        },
        logout: (state, action) => {
            state.data = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourierData.pending, (state) => {
                state.isLoadingData = true;
                state.errorData = "";
            })
            .addCase(fetchCourierData.rejected, (state, action) => {
                state.isLoadingData = false;
                state.errorData = action.payload;
            })
            .addCase(fetchCourierData.fulfilled, (state, action) => {
                state.errorData = "";
                state.isLoadingData = false;
                state.data = action.payload.courier;
            })
            .addCase(fetchCourierOrders.pending, (state) => {
                state.isLoadingOrders = true;
                state.errorOrders = "";
            })
            .addCase(fetchCourierOrders.rejected, (state, action) => {
                state.isLoadingOrders = false;
                state.errorOrders = action.payload;
            })
            .addCase(fetchCourierOrders.fulfilled, (state, action) => {
                state.isLoadingOrders = false;
                state.errorOrders = "";
            })
            .addCase(revertAll, () => initialState);
    },
});

// Action creators are generated for each case reducer function
export const { actions: courierActions } = courierSlice;
export const { reducer: courierReducer } = courierSlice;
