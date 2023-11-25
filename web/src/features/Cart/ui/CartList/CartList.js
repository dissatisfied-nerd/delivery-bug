import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { CartListItem } from "../CartListItem/CartListItem";
import cls from "./CartList.module.scss";

export const CartList = (props) => {
    const { className, cart, onAddToCart, onRemoveFromCart } = props;
    return (
        <div className={classNames(cls.CartList, {}, [className])}>
            {Object.values(cart).map(([good, count]) => {
                return (
                    <CartListItem
                        key={good.id}
                        count={count}
                        good={good}
                        onAddToCart={onAddToCart}
                        onRemoveFromCart={onRemoveFromCart}
                    />
                );
            })}
        </div>
    );
};
