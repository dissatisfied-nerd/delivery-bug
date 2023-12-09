import React, { useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui/Button/Button";
import { Card } from "shared/ui/Card/Card";
import cls from "./GoodListItem.module.scss";

export const GoodListItem = (props) => {
    const { className, good, onAddToCart, onRemoveFromCart, count } = props;

    return (
        <Card className={classNames(cls.GoodListItem, {}, [className])}>
            <div className={cls.imgWrapper}>
                <img src={good.img} alt={good.name} className={cls.img} />
            </div>
            <div className={cls.textWrapper}>
                <span className={cls.price}>{good.price} ₽</span>
                <span className={cls.title}>{good.name}</span>
            </div>
            {!count ? (
                <Button theme="primary" onClick={() => onAddToCart(good)}>
                    В корзину
                </Button>
            ) : (
                <div className={cls.counterWrapper}>
                    <Button
                        theme="primary"
                        onClick={() => onRemoveFromCart([good.id, false])}
                    >
                        -
                    </Button>
                    <span className={cls.count}>{count}</span>
                    <Button theme="primary" onClick={() => onAddToCart(good)}>
                        +
                    </Button>
                </div>
            )}
        </Card>
    );
};
