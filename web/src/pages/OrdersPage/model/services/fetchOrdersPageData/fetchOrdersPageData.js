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
            console.log(response);
            if (!response.data) {
                throw new Error();
            }

            let orders = response.data.orders;
            if (orders) {
                const response = await orders.map(async order => {
                    const goodsData = await order.products.map(async product => {
                        const {payload} = await dispatch(fetchGoodData(product.product_id))
                        return {amount: product.amount, ...payload}
                    })
                    const goodsResult = await Promise.all(goodsData)

                    const {payload: client} = await dispatch(fetchClientData({id: order.client_id, isAuth: true}))

                    return {
                        ...order,
                        ...client,
                        products: goodsResult
                    }
                })
                orders = await Promise.all(response)
            }
            return orders;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
