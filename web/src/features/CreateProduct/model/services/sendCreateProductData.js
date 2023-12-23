import { createAsyncThunk } from "@reduxjs/toolkit";
import { validateForm } from "shared/lib/validateForm/validateForm";

export const sendCreateProductData = createAsyncThunk(
    "createProduct/sendCreateProductData",
    async (createProductData, thunkAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI;

        try {
            if (!validateForm(createProductData)) {
                return rejectWithValue("Все поля должны быть заполнены");
            }

            const formData = new FormData();
            Object.entries(createProductData).forEach(([key, value]) => {
                formData.append(key, value);
            });
            // const response = await extra.api.post(
            //     `/market/`,
            //     registerData
            // );

            // if (!response.data) {
            //     throw new Error();
            // }

            // return response.data;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
