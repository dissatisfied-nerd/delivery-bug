import { createAsyncThunk } from "@reduxjs/toolkit";

export const finishOrder = createAsyncThunk(
    "profilePage/finishOrder",
    async ({ orderID, courierID }, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.post("/orders/finish", {
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
