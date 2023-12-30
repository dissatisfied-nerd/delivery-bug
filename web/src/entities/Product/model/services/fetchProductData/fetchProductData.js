import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductData = createAsyncThunk(
    "product/fetchProductData",
    async (id, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get(`/products/${id}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data.product;
        } catch (e) {
            return e?.response?.status === 400
                ? rejectWithValue("Товар не найден")
                : rejectWithValue("Что-то пошло не так. Попробуйте еще раз");
        }
    }
);
