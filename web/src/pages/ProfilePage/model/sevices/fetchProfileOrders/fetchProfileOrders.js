import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientActions } from "entities/Client";
import { courierActions } from "entities/Courier";
import { authActions, getAuthType } from "features/Auth";

export const fetchProfileOrders = createAsyncThunk(
    "profile/fetchProfileOrders",
    async (id, thunkAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI;
        const type = getAuthType(getState());

        try {
            let response;
            if (type === "client") {
                response = await extra.api.get(`api/orders/${id}`);
            } else {
                response = await extra.api.get(`api/orders/${id}`);
            }

            if (!response.data) {
                throw new Error();
            }

            if (type === "client") {
                dispatch(clientActions.setClientOrders(response.data));
            } else {
                dispatch(courierActions.setCouriertOrders(response.data));
            }
            return response.data;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
