import { createSlice } from "@reduxjs/toolkit";
import { PROFILE_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { fetchCourierData } from "../services/fetchCourierData/fetchCourierData";

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
    },
    courier_id: "",
    orders: [],
    error: "",
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
                state.isLoading = true;
                state.error = "";
            })
            .addCase(fetchCourierData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchCourierData.fulfilled, (state, action) => {
                state.error = "";
                state.isLoading = false;
                state.data = action.payload.courier;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: courierActions } = courierSlice;
export const { reducer: courierReducer } = courierSlice;
