import { createAsyncThunk } from "@reduxjs/toolkit";
import { courierActions } from "../../slice/CourierSlice";

export const fetchCourierData = createAsyncThunk(
    "courier/fetchCourierData",
    async (id, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.get(`/courier/${id}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
