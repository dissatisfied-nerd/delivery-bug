import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui/Button/Button";
import cls from "./CartListItem.module.scss";
import { ReactComponent as TrashBinSVG } from "shared/assets/trash-bin.svg";

export const CartListItem = (props) => {
    const { className, count, product, onAddToCart, onRemoveFromCart } = props;
    return (
        <div className={classNames(cls.CartListItem, {}, [className])}>
            <Button onClick={() => onRemoveFromCart([product.id, true])}>
                <TrashBinSVG />
            </Button>
            <img src={product.image} alt={product.title} className={cls.img} />
            <div className={cls.titleWrapper}>{product.name}</div>
            <span className={cls.price}>{product.price} ₽</span>
            <div className={cls.countsControlWrapper}>
                <Button onClick={() => onRemoveFromCart([product.id, false])}>
                    -
                </Button>
                <span className={cls.count}>{count}</span>
                <Button onClick={() => onAddToCart(product)}>+</Button>
            </div>
        </div>
    );
};
