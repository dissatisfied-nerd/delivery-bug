import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientActions } from "entities/Client";
import { getAuthIsAuth } from "features/Auth";
import { storeActions } from "../../slice/storeSlice";

export const fetchStoreData = createAsyncThunk(
    "store/fetchStoreData",
    async ({ id, isAuth }, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.get(`/store/${id}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue(
                e?.response?.data?.error ||
                    "Что-то пошло не так. Попробуйте еще раз"
            );
        }
    }
);
