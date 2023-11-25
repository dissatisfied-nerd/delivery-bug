import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { CartList } from "../CartList/CartList";
import { CartOrder } from "../CartOrder/CartOrder";
import cls from "./Cart.module.scss";

const getCartCount = (cart) => {
    let cartCount = 0;
    Object.values(cart).forEach(([good, count]) => {
        cartCount += count;
    });

    return cartCount;
};

const getCartCost = (cart) => {
    let cost = 0;
    Object.values(cart).forEach(([good, count]) => {
        cost += good.price * count;
    });

    return cost;
};

const getCartWeight = (cart) => {
    let weight = 0;
    Object.values(cart).forEach(([good, count]) => {
        weight += Number(good.weight) * 1000 * count;
    });

    return (weight / 1000).toFixed(2);
};

export const Cart = (props) => {
    const { className, cart, onAddToCart, onRemoveFromCart } = props;
    return (
        <div className={classNames(cls.Cart, {}, [className])}>
            <CartList
                cart={cart}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
            />
            <CartOrder
                className={cls.cartOrder}
                count={getCartCount(cart)}
                cost={getCartCost(cart)}
                weight={getCartWeight(cart)}
            />
        </div>
    );
};
