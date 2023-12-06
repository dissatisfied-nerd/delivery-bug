import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientActions } from "entities/Client";
import { courierActions } from "entities/Courier";
import { getAuthType } from "../../selectors/getAuthData";
import { authActions } from "../../slice/AuthSlice";
import { validateForm } from "../validateForm/validateForm";

export const sendRegisterData = createAsyncThunk(
    "auth/sendRegisterData",
    async (registerData, thunkAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI;
        const type = getAuthType(getState());

        try {
            if (!validateForm(registerData)) {
                return rejectWithValue("Все поля должны быть заполнены");
            }
            const response = await extra.api.post(
                `api/${type}/register`,
                registerData
            );

            if (!response.data) {
                throw new Error();
            }

            const data = { ...registerData, ...response.data };
            if (type === "client") {
                dispatch(clientActions.setClientData(data));
            } else {
                dispatch(courierActions.setCourierData(data));
            }
            dispatch(authActions.saveAuthData(response.data));
            // return response.data;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
