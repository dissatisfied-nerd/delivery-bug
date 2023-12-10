import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui/Button/Button";
import cls from "./CartListItem.module.scss";
import { ReactComponent as TrashBinSVG } from "shared/assets/trash-bin.svg";

export const CartListItem = (props) => {
    const { className, count, good, onAddToCart, onRemoveFromCart } = props;
    return (
        <div className={classNames(cls.CartListItem, {}, [className])}>
            <Button onClick={() => onRemoveFromCart([good.id, true])}>
                <TrashBinSVG />
            </Button>
            <img src={good.image} alt={good.title} className={cls.img} />
            <div className={cls.titleWrapper}>{good.title}</div>
            <span className={cls.price}>{good.price} ₽</span>
            <div className={cls.countsControlWrapper}>
                <Button onClick={() => onRemoveFromCart([good.id, false])}>
                    -
                </Button>
                <span className={cls.count}>{count}</span>
                <Button onClick={() => onAddToCart(good)}>+</Button>
            </div>
        </div>
    );
};
