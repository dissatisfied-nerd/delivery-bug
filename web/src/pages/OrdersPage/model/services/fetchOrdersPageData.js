import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrdersPageData = createAsyncThunk(
    "ordersPage/fetchOrdersPageData",
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get("/orders/free");

            if (!response.data) {
                throw new Error();
            }
            console.log(response.data);
            return response.data.orders;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
