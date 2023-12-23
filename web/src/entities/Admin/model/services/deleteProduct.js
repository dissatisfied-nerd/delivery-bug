import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientActions } from "entities/Client";
import { courierActions } from "entities/Courier";
import { fetchProductData } from "entities/Product";
import { authActions, getAuthType } from "features/Auth";

export const deleteProduct = createAsyncThunk(
    "admin/deleteProduct",
    async (id, thunkAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI;

        try {
            // const response = await extra.api.get(`/admin/delete/${id}`);
            // if (!response.data) {
            //     throw new Error();
            // }
            // return response.data;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
