import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGoodData = createAsyncThunk(
    "good/fetchGoodData",
    async (id, thunkAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI;

        try {
            const response = await extra.api.get(
                `/products/${id}`
            );

            if (!response.data) {
                throw new Error();
            }

            // const data = { ...loginData, ...response.data };
            // if (type === "client") {
            //     dispatch(clientActions.setClientData(data));
            // } else {
            //     dispatch(courierActions.setCourierData(data));
            // }
            // dispatch(authActions.saveAuthData(response.data));
            return response.data.product;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
