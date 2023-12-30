import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminActions } from "entities/Admin";
import { clientActions } from "entities/Client";
import { courierActions } from "entities/Courier";
import { storeActions } from "entities/Store";
import { validateForm } from "shared/lib/validateForm/validateForm";
import { getAuthType } from "../../selectors/getAuthData";
import { authActions } from "../../slice/AuthSlice";

export const sendRegisterData = createAsyncThunk(
    "auth/sendRegisterData",
    async (registerData, thunkAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI;
        const type = getAuthType(getState());

        try {
            const validateError = validateForm(registerData);
            if (validateError) {
                return rejectWithValue(validateError);
            }
            const response = await extra.api.post(
                `/${type}/register`,
                registerData
            );

            if (!response.data) {
                throw new Error();
            }

            const data = { ...registerData, ...response.data };
            if (type === "client") {
                dispatch(clientActions.setClientData(data));
            } else if (type === "courier") {
                dispatch(courierActions.setCourierData(data));
            } else if (type === "store") {
                dispatch(storeActions.setStoreData(data));
            } else if (type === "admin") {
                dispatch(adminActions.setAdminData(data));
            }
            dispatch(authActions.saveAuthData(response.data));
        } catch (e) {
            return rejectWithValue(
                e?.response?.data?.error ||
                    "Что-то пошло не так. Попробуйте еще раз"
            );
        }
    }
);
