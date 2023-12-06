import { createAsyncThunk } from "@reduxjs/toolkit";
import { authActions } from "../../slice/AuthSlice";

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    const { extra, rejectWithValue, dispatch } = thunkAPI;

    try {
        await extra.api.post(`api/logout`);

        dispatch(authActions.logout());
        // return response.data;
    } catch (e) {
        return rejectWithValue("error");
    }
});
