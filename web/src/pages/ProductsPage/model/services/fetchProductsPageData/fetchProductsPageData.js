import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductsPageData = createAsyncThunk(
    "productsPage/fetchProductsPageData",
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get("/products");

            return response.data.products;
        } catch (e) {
            return rejectWithValue(
                e?.response?.data?.error ||
                    "Что-то пошло не так. Попробуйте еще раз"
            );
        }
    }
);
