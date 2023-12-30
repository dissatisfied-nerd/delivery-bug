import { createAsyncThunk } from "@reduxjs/toolkit";
import { getClientId } from "entities/Client";
import { cartActions } from "../../slice/CartSlice";

export const createOrder = createAsyncThunk(
    "cart/createOrder",
    async (cartData, thunkAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI;
        const client_id = getClientId(getState());
        const data = {
            price: cartData.price,
            client_id,
            products: Object.values(cartData.cart).map((cartEl) => ({
                amount: cartEl[1],
                product_id: cartEl[0].id,
            })),
        };
        try {
            const response = await extra.api.post(`/orders/`, data);

            if (!response.data) {
                throw new Error();
            }

            dispatch(cartActions.emptyCart());
        } catch (e) {
            return rejectWithValue(
                e?.response?.data?.error ||
                    "Что-то пошло не так. Попробуйте еще раз"
            );
        }
    }
);
