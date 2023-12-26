import { createAsyncThunk } from "@reduxjs/toolkit";
import { cartActions } from "features/Cart";
import { revertAll } from "shared/actions/actions";
import { authActions } from "../../slice/AuthSlice";

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    const { extra, rejectWithValue, dispatch } = thunkAPI;

    try {
        const response = await extra.api.post(`/logout`);
        // dispatch(authActions.logout());
        dispatch(revertAll());
        // return response.data;
    } catch (e) {
        return rejectWithValue("error");
    }
});
