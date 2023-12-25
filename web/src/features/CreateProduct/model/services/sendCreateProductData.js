import { createAsyncThunk } from "@reduxjs/toolkit";
import { getStoreId } from "entities/Store";
import { validateForm } from "shared/lib/validateForm/validateForm";

export const sendCreateProductData = createAsyncThunk(
    "createProduct/sendCreateProductData",
    async (createProductData, thunkAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI;
        const id = getStoreId(getState());

        try {
            if (!validateForm(createProductData)) {
                return rejectWithValue("Все поля должны быть заполнены");
            }

            const blobToDataUrl = (blob) =>
                new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });

            const blobToBase64 = (blob) =>
                blobToDataUrl(blob).then((text) =>
                    text.slice(text.indexOf(","))
                );

            const base64 = await blobToBase64(createProductData.image);
            console.log(base64);

            const response = await extra.api.post(`/store/products/${id}`, {
                ...createProductData,
                image: base64,
            });

            if (!response.data) {
                throw new Error();
            }

            // return response.data;
        } catch (e) {
            return rejectWithValue(
                e?.response?.data?.error ||
                    "Что-то пошло не так. Попробуйте еще раз"
            );
        }
    }
);
