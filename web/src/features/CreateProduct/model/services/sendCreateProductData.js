import { createAsyncThunk } from "@reduxjs/toolkit";
import { getStoreId } from "entities/Store";
import { validateForm } from "shared/lib/validateForm/validateForm";

export const sendCreateProductData = createAsyncThunk(
    "createProduct/sendCreateProductData",
    async (createProductData, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;
        const id = getStoreId(getState());

        try {
            const validateError = validateForm(createProductData);
            if (validateError) {
                return rejectWithValue(validateError);
            }

            const blobToDataUrl = (blob) =>
                new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });

            const blobToBase64 = (blob) =>
                blobToDataUrl(blob).then((text) => {
                    return text;
                });

            const base64 = await blobToBase64(createProductData.image);

            const response = await extra.api.post(`/store/products/${id}`, {
                ...{
                    ...createProductData,
                    price: Number.parseFloat(createProductData.price),
                    weight: Number.parseFloat(createProductData.weight),
                },
                image: base64,
            });

            if (!response.data) {
                throw new Error();
            }
        } catch (e) {
            return rejectWithValue(
                e?.response?.data?.error ||
                    "Что-то пошло не так. Попробуйте еще раз"
            );
        }
    }
);
