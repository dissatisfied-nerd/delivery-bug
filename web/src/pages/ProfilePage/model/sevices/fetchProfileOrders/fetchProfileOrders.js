import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    clientActions,
    fetchClientData,
    fetchClientOrders,
    getClientId,
} from "entities/Client";
import {
    courierActions,
    fetchCourierOrders,
    getCourierId,
} from "entities/Courier";
import { fetchProductData } from "entities/Product";
import { authActions, getAuthType } from "features/Auth";

export const fetchProfileOrders = createAsyncThunk(
    "profile/fetchProfileOrders",
    async (type, thunkAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI;

        try {
            if (type === "client") {
                const id = getClientId(getState());
                const response = await dispatch(fetchClientOrders(id));
                if (!response.data) {
                    throw new Error();
                }
            } else {
                const id = getCourierId(getState());
                let { payload: orders } = await dispatch(
                    fetchCourierOrders(id)
                );
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

                        const { payload: client } = await dispatch(
                            fetchClientData({
                                id: order.client_id,
                                isAuth: true,
                            })
                        );

                        return {
                            ...order,
                            ...client,
                            products: productsResult,
                        };
                    });
                    orders = await Promise.all(response);
                    console.log(orders);
                    dispatch(courierActions.setCourierOrders(orders));
                }
            }
        } catch (e) {
            return rejectWithValue(
                e?.response?.data?.error ||
                    "Что-то пошло не так. Попробуйте еще раз"
            );
        }
    }
);
