import { createSlice } from "@reduxjs/toolkit";
import { fetchOrdersPageData } from "../services/fetchOrdersPageData/fetchOrdersPageData";
import { takeOrder } from "../services/takeOrder/takeOrder";

const initialState = {
    isLoading: false,
    orders: [],
    error: "",
    isOrderTaken: false,
};

export const ordersPageSlice = createSlice({
    name: "ordersPage",
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        setProductsDataByOrderId: (state, action) => {
            console.log("PRODUCT");
            const { order_id, products } = action.payload;
            state.orders[order_id].products = state.orders[
                order_id
            ].products.map((product, i) => ({
                amount: product.amount,
                ...products[i],
            }));
        },
        setClientDataInOrder: (state, action) => {
            const { i, client } = action.payload;
            state.orders[i] = {
                ...state.orders[i],
                client,
            };
        },
        resetIsOrderTaken: (state) => {
            state.isOrderTaken = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrdersPageData.pending, (state, action) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(fetchOrdersPageData.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.error = "";
                state.isLoading = false;
            })
            .addCase(fetchOrdersPageData.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(takeOrder.pending, (state, action) => {
                state.isLoading = true;
                state.error = "";
            })
            .addCase(takeOrder.fulfilled, (state, action) => {
                state.isOrderTaken = true;
                state.isLoading = false;
                state.error = "";
            })
            .addCase(takeOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: ordersPageActions } = ordersPageSlice;
export const { reducer: ordersPageReducer } = ordersPageSlice;
