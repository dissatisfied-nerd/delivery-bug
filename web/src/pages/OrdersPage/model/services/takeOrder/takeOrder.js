import { createAsyncThunk } from "@reduxjs/toolkit";

export const takeOrder = createAsyncThunk(
    "ordersPage/takeOrder",
    async ({ orderID, courierID }, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post("/orders/take", {
                params: {
                    orderID,
                    courierID,
                },
            });

            if (!response.data) {
                throw new Error();
            }
            console.log(response.data);
            // return response.data.orders;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
