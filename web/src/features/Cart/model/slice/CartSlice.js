import { createSlice } from "@reduxjs/toolkit";
import { CART_LOCALSTORAGE_KEY } from "shared/const/localstorage";

const initialState = {
    cart: {},
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        initCart: (state, _) => {
            const cart = JSON.parse(
                localStorage.getItem(CART_LOCALSTORAGE_KEY)
            );

            if (cart) {
                state.cart = cart;
            }
        },
        addToCart: (state, action) => {
            if (state.cart[action.payload.id] !== undefined) {
                state.cart[action.payload.id] = [
                    state.cart[action.payload.id][0],
                    state.cart[action.payload.id][1] + 1,
                ];
            } else {
                state.cart[action.payload.id] = [action.payload, 1];
            }
            localStorage.setItem(
                CART_LOCALSTORAGE_KEY,
                JSON.stringify(state.cart)
            );
        },
        removeFromCart: (state, action) => {
            const [id, flag] = action.payload;
            if (state.cart[id][1] === 1 || flag) {
                delete state.cart[id];
            } else {
                state.cart[id] = [state.cart[id][0], state.cart[id][1] - 1];
            }
            localStorage.setItem(
                CART_LOCALSTORAGE_KEY,
                JSON.stringify(state.cart)
            );
        },
    },
});

// Action creators are generated for each case reducer function
export const { actions: cartActions } = cartSlice;
export const { reducer: cartReducer } = cartSlice;
