import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientActions } from "entities/Client";
import { getAuthIsAuth } from "features/Auth";

export const fetchClientData = createAsyncThunk(
    "client/fetchClientData",
    async ({ id, isAuth }, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.get(`/client/${id}`);

            if (!response.data) {
                throw new Error();
            }

            if (!isAuth) {
                dispatch(clientActions.setClientData(response.data.client));
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
