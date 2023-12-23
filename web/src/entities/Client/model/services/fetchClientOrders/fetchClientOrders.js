import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientActions } from "entities/Client";
import { courierActions } from "entities/Courier";
import { fetchProductData } from "entities/Product";
import { authActions, getAuthType } from "features/Auth";

export const fetchClientOrders = createAsyncThunk(
    "client/fetchClientOrders",
    async (id, thunkAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI;

        try {
            const response = await extra.api.get(`/client/orders/${id}`);

            if (!response.data) {
                throw new Error();
            }
            console.log(response.data.orders);

            let orders = response.data.orders;
            if (orders) {
                const response = await orders.map(async (order) => {
                    const productsData = await order.products.map(
                        async (product) => {
                            const { payload } = await dispatch(
                                fetchProductData(product.product_id)
                            );
                            return { amount: product.amount, ...payload };
                        }
                    );
                    const productsResult = await Promise.all(productsData);

                    return {
                        ...order,
                        products: productsResult,
                    };
                });
                orders = await Promise.all(response);
            }

            return orders;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
