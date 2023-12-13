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
        console.log(data);
        try {
            const response = await extra.api.post(`/orders/`, data);

            if (!response.data) {
                throw new Error();
            }

            dispatch(cartActions.emptyCart());
            // const data = { ...registerData, ...response.data };
            // if (type === "client") {
            //     dispatch(clientActions.setClientData(data));
            // } else {
            //     dispatch(courierActions.setCourierData(data));
            // }
            // dispatch(authActions.saveAuthData(response.data));
            // return response.data;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
