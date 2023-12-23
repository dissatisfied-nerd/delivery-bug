import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientActions } from "entities/Client";
import { courierActions } from "entities/Courier";
import { fetchGoodData } from "entities/Good";
import { authActions, getAuthType } from "features/Auth";

export const deleteGood = createAsyncThunk(
    "admin/deleteGood",
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
