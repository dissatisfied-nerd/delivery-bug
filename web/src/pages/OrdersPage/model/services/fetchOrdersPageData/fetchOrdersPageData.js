import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchClientData } from "entities/Client";
import { fetchGoodData } from "entities/Good";
import { ordersPageActions } from "../../slice/ordersPageSlice";

export const fetchOrdersPageData = createAsyncThunk(
    "ordersPage/fetchOrdersPageData",
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.get("/orders/free");

            if (!response.data) {
                throw new Error();
            }

            dispatch(ordersPageActions.setOrders(response.data.orders));

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
                            ordersPageActions.setProductsDataByOrderId({
                                order_id: id,
                                products,
                            })
                        );
                    });
                });

                const clientsInfo = orders.map(async (order) => {
                    const { payload } = await dispatch(
                        fetchClientData({
                            id: order.client_id,
                            isAuth: true,
                        })
                    );
                    return payload;
                });
                Promise.all(clientsInfo).then((clients) =>
                    clients.forEach((client, i) =>
                        dispatch(
                            ordersPageActions.setClientDataInOrder({
                                client,
                                i,
                            })
                        )
                    )
                );
            }

            return response.data.orders;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
