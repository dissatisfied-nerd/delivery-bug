import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchClientData, getClientId } from "entities/Client";
import { fetchCourierData, getCourierId } from "entities/Courier";
import { fetchMarketData, getMarketId } from "entities/Market";
import { authActions, getAuthType } from "features/Auth";

export const getProfileData = createAsyncThunk(
    "profile/getProfileData",
    async (type, thunkAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI;

        try {
            let data;
            if (type === "client") {
                const id = getClientId(getState());
                const { payload } = await dispatch(
                    fetchClientData({ id, isAuth: false })
                );
                data = payload;
            } else if (type === "courier") {
                const id = getCourierId(getState());
                const { payload } = await dispatch(fetchCourierData(id));
                data = payload;
            } else if (type === "market") {
                const id = getMarketId(getState());
                const { payload } = await dispatch(fetchMarketData(id));
                data = payload;
            }

            dispatch(authActions.saveAuthData(data[type]));
            return data;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
