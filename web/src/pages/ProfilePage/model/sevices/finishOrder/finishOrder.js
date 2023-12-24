import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProfileOrders } from "../fetchProfileOrders/fetchProfileOrders";

export const finishOrder = createAsyncThunk(
    "profilePage/finishOrder",
    async ({ orderID, courierID }, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;
        console.log({
            orderID,
            courierID,
        });

        try {
            const response = await extra.api.post(
                "/orders/finish",
                {},
                {
                    params: {
                        orderID,
                        courierID,
                    },
                }
            );

            if (!response.data) {
                throw new Error();
            }

            dispatch(fetchProfileOrders("courier"));
            return response.data;
        } catch (e) {
            return rejectWithValue(
                e?.response?.data?.error ||
                    "Что-то пошло не так. Попробуйте еще раз"
            );
        }
    }
);
