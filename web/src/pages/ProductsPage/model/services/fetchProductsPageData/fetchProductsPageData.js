import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthType } from "features/Auth";

export const fetchProductsPageData = createAsyncThunk(
    "productsPage/fetchProductsPageData",
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;
        const type = getAuthType(getState());

        try {
            const response = await extra.api.get("/products");

            let products = response.data.products;

            if (products && type === "client") {
                products = products.filter((product) => product.quantity);
            }
            return products;
        } catch (e) {
            return rejectWithValue(
                e?.response?.data?.error ||
                    "Что-то пошло не так. Попробуйте еще раз"
            );
        }
    }
);
