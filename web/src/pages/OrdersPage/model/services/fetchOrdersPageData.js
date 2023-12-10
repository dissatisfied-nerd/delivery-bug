import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrdersPageData = createAsyncThunk(
    "ordersPage/fetchOrdersPageData",
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get("/api/orders/free");

            if (!response.data) {
                throw new Error();
            }

            return response.data.orders;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
