import { cartActions } from "../../model/slice/CartSlice";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { CartList } from "../CartList/CartList";
import { CartOrder } from "../CartOrder/CartOrder";
import cls from "./Cart.module.scss";
import {
    getCartCost,
    getCartCount,
    getCartData,
    getCartIsLoading,
    getCartWeight,
} from "../../model/selectors/getCartData";
import { createOrder } from "../../model/services/createOrder/createOrder";

export const Cart = (props) => {
    const { className } = props;
    const dispatch = useDispatch();

    const cart = useSelector(getCartData);
    const weight = useSelector(getCartWeight);
    const count = useSelector(getCartCount);
    const cost = useSelector(getCartCost);
    const isLoading = useSelector(getCartIsLoading);

    const onAddToCart = useCallback(
        (product) => {
            dispatch(cartActions.addToCart(product));
        },
        [dispatch]
    );

    const onRemoveFromCart = useCallback(
        (id) => {
            dispatch(cartActions.removeFromCart(id));
        },
        [dispatch]
    );

    const onCreateOrder = useCallback(() => {
        dispatch(createOrder({ cart, price: cost }));
    }, [dispatch, cart, cost]);

    return (
        <div className={classNames(cls.Cart, {}, [className])}>
            <CartList
                cart={cart}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
            />
            <CartOrder
                className={cls.cartOrder}
                count={count}
                cost={cost}
                weight={weight}
                onCreateOrder={onCreateOrder}
                isLoading={isLoading}
            />
        </div>
    );
};
