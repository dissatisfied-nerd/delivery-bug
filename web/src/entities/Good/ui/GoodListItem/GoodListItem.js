import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui/Button/Button";
import { Card } from "shared/ui/Card/Card";
import cls from "./GoodListItem.module.scss";

export const GoodListItem = (props) => {
    const { className, good } = props;
    return (
        <Card className={classNames(cls.GoodListItem, {}, [className])}>
            <div className={cls.imgWrapper}>
                <img src={good.img} alt={good.title} className={cls.img} />
            </div>
            <div className={cls.textWrapper}>
                <span className={cls.price}>{good.price} ₽</span>
                <span className={cls.title}>{good.title}</span>
            </div>
            <Button className={cls.toCartBtn}>В корзину</Button>
        </Card>
    );
};
