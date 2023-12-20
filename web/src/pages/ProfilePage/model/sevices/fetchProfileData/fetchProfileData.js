import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchClientData } from "entities/Client";
import { fetchCourierData } from "entities/Courier";
import { authActions, getAuthType } from "features/Auth";

export const getProfileData = createAsyncThunk(
    "profile/getProfileData",
    async (id, thunkAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI;
        const type = getAuthType(getState());

        try {
            const { payload } =
                type === "client"
                    ? await dispatch(fetchClientData({ id, isAuth: false }))
                    : await dispatch(fetchCourierData(id));

            dispatch(authActions.saveAuthData(payload[type]));
            return payload;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
