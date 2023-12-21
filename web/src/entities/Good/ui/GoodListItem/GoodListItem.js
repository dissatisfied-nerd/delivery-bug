import React, { useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui/Button/Button";
import { Card } from "shared/ui/Card/Card";
import cls from "./GoodListItem.module.scss";

export const GoodListItem = (props) => {
    const { className, good, onAddToCart, onRemoveFromCart, count, type } =
        props;

    if (type === "small") {
        return (
            <Card className={classNames(cls.GoodListItem, {}, [className])}>
                <div className={cls.imgWrapper}>
                    <img src={good.image} alt={good.name} className={cls.img} />
                </div>
                <div className={cls.textWrapper}>
                    <span className={classNames(cls.price, {}, [cls.bold])}>
                        {good.price} ₽
                    </span>
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
                        <Button
                            theme="primary"
                            onClick={() => onAddToCart(good)}
                        >
                            +
                        </Button>
                    </div>
                )}
            </Card>
        );
    } else {
        return (
            <Card
                className={classNames(cls.GoodListItem, {}, [
                    className,
                    cls.big,
                ])}
            >
                <div className={cls.imgWrapper}>
                    <img src={good.image} alt={good.name} className={cls.img} />
                </div>
                <div className={cls.textWrapper}>
                    <span>
                        <span className={cls.bold}> Название </span> {good.name}
                    </span>
                    <span>
                        <span className={cls.bold}>Цена </span> {good.price} ₽
                    </span>
                    <span>
                        <span className={cls.bold}>Вес </span> {good.weight} кг
                    </span>
                    <span>
                        <span className={cls.bold}>Описание </span>
                        <p className={cls.description}>{good.description}</p>
                    </span>
                </div>
            </Card>
        );
    }
};
