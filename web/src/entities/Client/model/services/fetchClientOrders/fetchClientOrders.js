import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientActions } from "entities/Client";
import { courierActions } from "entities/Courier";
import { fetchGoodData } from "entities/Good";
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
                    const goodsData = await order.products.map(
                        async (product) => {
                            const { payload } = await dispatch(
                                fetchGoodData(product.product_id)
                            );
                            return { amount: product.amount, ...payload };
                        }
                    );
                    const goodsResult = await Promise.all(goodsData);

                    return {
                        ...order,
                        products: goodsResult,
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
