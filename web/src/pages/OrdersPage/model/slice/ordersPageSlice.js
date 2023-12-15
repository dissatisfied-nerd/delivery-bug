import { createSlice } from "@reduxjs/toolkit";
import { fetchOrdersPageData } from "../services/fetchOrdersPageData/fetchOrdersPageData";
import { takeOrder } from "../services/takeOrder/takeOrder";

const initialState = {
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
            .addCase(fetchOrdersPageData.fulfilled, (state, action) => {
                state.error = "";
            })
            .addCase(fetchOrdersPageData.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(takeOrder.fulfilled, (state, action) => {
                state.isOrderTaken = true;
            })
            .addCase(takeOrder.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: ordersPageActions } = ordersPageSlice;
export const { reducer: ordersPageReducer } = ordersPageSlice;
