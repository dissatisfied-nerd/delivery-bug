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

            dispatch(courierActions.setCourierOrders(response.data.orders));

            const orders = response.data.orders;
            if (orders) {
                orders.forEach((order, id) => {
                    const products = order.products.map(
                        async (product) =>
                            await (
                                await dispatch(
                                    fetchGoodData(product.product_id)
                                )
                            ).payload
                    );
                    Promise.all(products).then((products) => {
                        dispatch(
                            courierActions.setProductsDataByOrderId({
                                order_id: id,
                                products,
                            })
                        );
                    });
                });
            }
            // dispatch(clientActions.setClientOrders(orders));

            return orders;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
