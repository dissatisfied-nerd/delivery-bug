import { createAsyncThunk } from "@reduxjs/toolkit";
import { cartActions } from "features/Cart";
import { authActions } from "../../slice/AuthSlice";

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    const { extra, rejectWithValue, dispatch } = thunkAPI;

    try {
        await extra.api.post(`/logout`);

        dispatch(authActions.logout());
        dispatch(cartActions.emptyCart());
        // return response.data;
    } catch (e) {
        return rejectWithValue("error");
    }
});
