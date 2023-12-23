import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientActions } from "entities/Client";
import { getAuthIsAuth } from "features/Auth";
import { marketActions } from "../../slice/marketSlice";

export const fetchMarketData = createAsyncThunk(
    "market/fetchMarketData",
    async ({ id, isAuth }, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.get(`/market/${id}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
