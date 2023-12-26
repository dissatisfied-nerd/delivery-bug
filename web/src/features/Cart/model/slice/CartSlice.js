import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "shared/actions/actions";
import { CART_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { createOrder } from "../services/createOrder/createOrder";

const initialState = {
    cart: {},
    weight: "",
    cost: 0,
    count: 0,
    isOrderCreated: false,
    error: "",
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
            cartSlice.caseReducers.setCartWeight(state);
            cartSlice.caseReducers.setCartCost(state);
            cartSlice.caseReducers.setCartCount(state);
        },
        setCartWeight: (state, action) => {
            let weight = 0;
            Object.values(state.cart).forEach(([product, count]) => {
                weight += Number(product.weight) * 1000 * count;
            });
            state.weight = (weight / 1000).toFixed(2);
        },
        setCartCount: (state, action) => {
            let cartCount = 0;
            Object.values(state.cart).forEach(([product, count]) => {
                cartCount += count;
            });

            state.count = cartCount;
        },
        setCartCost: (state, action) => {
            let cost = 0;
            Object.values(state.cart).forEach(([product, count]) => {
                cost += product.price * count;
            });

            state.cost = Number.parseFloat(cost.toFixed(2));
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
            cartSlice.caseReducers.setCartWeight(state);
            cartSlice.caseReducers.setCartCost(state);
            cartSlice.caseReducers.setCartCount(state);

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
            cartSlice.caseReducers.setCartWeight(state);
            cartSlice.caseReducers.setCartCost(state);
            cartSlice.caseReducers.setCartCount(state);

            localStorage.setItem(
                CART_LOCALSTORAGE_KEY,
                JSON.stringify(state.cart)
            );
        },
        emptyCart: (state, _) => {
            state.cart = {};
            state.weight = "";
            state.cost = 0;
            state.count = 0;
            localStorage.removeItem(CART_LOCALSTORAGE_KEY);
        },
        setIsOrderCreated: (state, action) => {
            state.isOrderCreated = action.payload;
        },
    },
    extraReducers: (build) => {
        build
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isOrderCreated = true;
                state.error = "";
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isOrderCreated = false;
                state.error = action.payload;
            })
            .addCase(revertAll, () => initialState);
    },
});

// Action creators are generated for each case reducer function
export const { actions: cartActions } = cartSlice;
export const { reducer: cartReducer } = cartSlice;
