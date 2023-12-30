import { createAsyncThunk } from "@reduxjs/toolkit";
import { revertAll } from "shared/actions/actions";

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    const { extra, rejectWithValue, dispatch } = thunkAPI;

    try {
        await extra.api.post(`/logout`);
        dispatch(revertAll());
    } catch (e) {
        return rejectWithValue("error");
    }
});
