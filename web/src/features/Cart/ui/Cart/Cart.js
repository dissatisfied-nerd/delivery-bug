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
    getCartWeight,
} from "../../model/selectors/getCartData";

export const Cart = (props) => {
    const { className, cart } = props;
    const dispatch = useDispatch();
    const weight = useSelector(getCartWeight);
    const count = useSelector(getCartCount);
    const cost = useSelector(getCartCost);

    const onAddToCart = useCallback(
        (good) => {
            dispatch(cartActions.addToCart(good));
        },
        [dispatch]
    );

    const onRemoveFromCart = useCallback(
        (id) => {
            dispatch(cartActions.removeFromCart(id));
        },
        [dispatch]
    );

    const createOrder = useCallback(() => {
        dispatch(createOrder(cart));
    }, [dispatch, cart]);

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
            />
        </div>
    );
};
