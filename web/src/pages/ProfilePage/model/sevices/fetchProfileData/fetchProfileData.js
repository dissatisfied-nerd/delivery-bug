import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientActions } from "entities/Client";
import { courierActions } from "entities/Courier";
import { authActions, getAuthType } from "features/Auth";

export const getProfileData = createAsyncThunk(
    "profile/getProfileData",
    async (id, thunkAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI;
        const type = getAuthType(getState());

        try {
            const response = await extra.api.get(`api/${type}/${id}`);

            if (!response.data) {
                throw new Error();
            }

            if (type === "client") {
                dispatch(clientActions.setClientData(response.data.client));
            } else {
                dispatch(courierActions.setCourierData(response.data));
            }
            dispatch(authActions.saveAuthData(response.data[type]));
            return response.data;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
