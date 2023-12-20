import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientActions } from "entities/Client";
import { courierActions } from "entities/Courier";
import { fetchGoodData } from "entities/Good";
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
            // dispatch(clientActions.setClientOrders(orders));

            return orders;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
