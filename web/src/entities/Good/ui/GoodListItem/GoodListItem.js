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
                <img src={good.img} alt={good.title} className={cls.img} />
            </div>
            <div className={cls.textWrapper}>
                <span className={cls.price}>{good.price} ₽</span>
                <span className={cls.title}>{good.title}</span>
            </div>
            {!count ? (
                <Button className={cls.btn} onClick={() => onAddToCart(good)}>
                    В корзину
                </Button>
            ) : (
                <div className={cls.counterWrapper}>
                    <Button
                        className={cls.btn}
                        onClick={() => onRemoveFromCart([good.id, false])}
                    >
                        -
                    </Button>
                    <span className={cls.count}>{count}</span>
                    <Button
                        className={cls.btn}
                        onClick={() => onAddToCart(good)}
                    >
                        +
                    </Button>
                </div>
            )}
        </Card>
    );
};
