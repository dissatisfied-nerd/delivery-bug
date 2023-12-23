import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductsPageData = createAsyncThunk(
    "productsPage/fetchProductsPageData",
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get("/products");
            console.log(response.data);
            return response.data.products;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);
