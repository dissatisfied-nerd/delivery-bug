import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientActions } from "entities/Client";
import { courierActions } from "entities/Courier";
import { getAuthType } from "../selectors/getAuthData";
import { authActions } from "../slice/AuthSlice";
import { validateForm } from "./validateForm/validateForm";

export const sendRegisterData = createAsyncThunk(
    "auth/sendRegisterData",
    async (registerData, thunkAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI;
        const type = getAuthType(getState());

        try {
            if (!validateForm(registerData)) {
                return rejectWithValue("Все поля должны быть заполнены");
            }
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
            const data =
                type === "client"
                    ? {
                          address: [
                              {
                                  city: registerData.city,
                                  street: registerData.street,
                                  building: registerData.building,
                                  entrance: registerData.entrance,
                                  floor: registerData.floor,
                                  aparts: registerData.aparts,
                              },
                          ],
                          firstName: registerData.firstName,
                          lastName: registerData.lastName,
                          email: registerData.email,
                          password: registerData.password,
                      }
                    : registerData;
            if (type === "client") {
                dispatch(clientActions.setClientData(data));
            } else {
                dispatch(courierActions.setCourierData(data));
            }
            dispatch(authActions.saveAuthData(data));
            // return response.data;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
