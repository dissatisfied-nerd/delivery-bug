import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductData } from "entities/Product";

export const fetchClientOrders = createAsyncThunk(
    "client/fetchClientOrders",
    async (id, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.get(`/client/orders/${id}`);

            if (!response.data) {
                throw new Error();
            }

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
            return rejectWithValue(
                e?.response?.data?.error ||
                    "Что-то пошло не так. Попробуйте еще раз"
            );
        }
    }
);
