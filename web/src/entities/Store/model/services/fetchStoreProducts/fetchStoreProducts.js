import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientActions } from "entities/Client";
import { getAuthIsAuth } from "features/Auth";
import { storeActions } from "../../slice/storeSlice";

export const fetchStoreProducts = createAsyncThunk(
    "store/fetchStoreProducts",
    async (id, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.get(`/store/products/${id}`);
            if (!response.data) {
                throw new Error();
            }
            console.log(response.data);

            return response.data;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
