import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCourierOrders = createAsyncThunk(
    "courier/fetchCourierOrders",
    async (id, thunkAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI;

        try {
            const response = await extra.api.get(`/courier/orders/${id}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data.orders;
        } catch (e) {
            return rejectWithValue(
                e?.response?.data?.error ||
                    "Что-то пошло не так. Попробуйте еще раз"
            );
        }
    }
);
