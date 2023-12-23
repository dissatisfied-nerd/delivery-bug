import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { CartListItem } from "../CartListItem/CartListItem";
import cls from "./CartList.module.scss";

export const CartList = (props) => {
    const { className, cart, onAddToCart, onRemoveFromCart } = props;
    return (
        <div className={classNames(cls.CartList, {}, [className])}>
            {Object.values(cart).map(([product, count]) => {
                return (
                    <CartListItem
                        key={product.id}
                        count={count}
                        product={product}
                        onAddToCart={onAddToCart}
                        onRemoveFromCart={onRemoveFromCart}
                    />
                );
            })}
        </div>
    );
};
