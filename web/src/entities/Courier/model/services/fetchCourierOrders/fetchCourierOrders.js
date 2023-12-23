import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientActions } from "entities/Client";
import { courierActions } from "entities/Courier";
import { fetchProductData } from "entities/Product";
import { authActions, getAuthType } from "features/Auth";

export const fetchCourierOrders = createAsyncThunk(
    "courier/fetchCourierOrders",
    async (id, thunkAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI;

        try {
            const response = await extra.api.get(`/courier/orders/${id}`);

            if (!response.data) {
                throw new Error();
            }

            let orders = response.data.orders;
            console.log(orders);
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
            // dispatch(clientActions.setClientOrders(orders));

            return orders;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
