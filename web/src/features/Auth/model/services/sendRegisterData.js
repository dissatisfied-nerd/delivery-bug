import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientActions } from "entities/Client";
import { courierActions } from "entities/Courier";
import { getAuthType } from "../selectors/getAuthData";

export const sendRegisterData = createAsyncThunk(
    "auth/sendRegisterData",
    async (registerData, thunkAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI;
        const type = getAuthType(getState());

        try {
            // const response = await extra.api.post("/register", registerData, {
            //     headers: {
            //         "Access-Control-Allow-Origin": "*",
            //         "Access-Control-Allow-Methods":
            //             "POST, GET, OPTIONS, PUT, DELETE",
            //     },
            // });

            // if (!response.data) {
            //     throw new Error();
            // }
            if (type === "client") {
                dispatch(clientActions.setClientData(registerData));
            } else {
                dispatch(courierActions.setCourierData(registerData));
            }
            // return response.data;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
