import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientActions } from "entities/Client";
import { courierActions } from "entities/Courier";
import { fetchGoodData } from "entities/Good";
import { authActions, getAuthType } from "features/Auth";

export const fetchProfileOrders = createAsyncThunk(
    "profile/fetchProfileOrders",
    async (id, thunkAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI;
        const type = getAuthType(getState());

        try {
            let response;
            if (type === "client") {
                response = await extra.api.get(`/client/orders/${id}`);
            } else {
                response = await extra.api.get(`/orders/${id}`);
            }

            if (!response.data) {
                throw new Error();
            }
            console.log(response.data.orders);
            if (type === "client") {
                dispatch(clientActions.setClientOrders(response.data.orders));

                const orders = response.data.orders
                if (orders) {
                    orders.forEach((order, id) => {
                        const products = order.products.map(async product => await (await dispatch(fetchGoodData(product.product_id))).payload)
                        Promise.all(products).then(products => {
                            dispatch(clientActions.setProductsDataByOrderId({
                                order_id: id,
                                products
                            }))
                        })
                    })
                }
                // dispatch(clientActions.setClientOrders(orders));
            } else {
                dispatch(courierActions.setCouriertOrders(response.data));
            }
            return response.data;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
