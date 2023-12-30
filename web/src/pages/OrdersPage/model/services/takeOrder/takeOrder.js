import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrdersPageData } from "../fetchOrdersPageData/fetchOrdersPageData";

export const takeOrder = createAsyncThunk(
    "ordersPage/takeOrder",
    async ({ orderID, courierID }, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.post("/orders/take", null, {
                params: {
                    orderID,
                    courierID,
                },
            });

            if (!response.data) {
                throw new Error();
            }
            dispatch(fetchOrdersPageData());
        } catch (e) {
            return rejectWithValue(
                e?.response?.data?.error ||
                    "Что-то пошло не так. Попробуйте еще раз"
            );
        }
    }
);
