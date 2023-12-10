import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui/Button/Button";
import cls from "./CartOrder.module.scss";

export const CartOrder = (props) => {
    const { className, count, weight, cost, onCreateOrder } = props;

    return (
        <div className={classNames(cls.CartOrder, {}, [className])}>
            <span className={cls.title}>Ваша корзина</span>
            <div className={cls.information}>
                <span>Товаров</span>
                <span>{count}</span>
            </div>
            <div className={cls.information}>
                <span>Вес</span>
                <span>{weight} кг</span>
            </div>
            <div className={cls.information}>
                <span>К оплате</span>
                <span className={cls.cost}>{cost} ₽</span>
            </div>
            <Button className={cls.orderBtn} onClick={onCreateOrder}>
                Оформить заказ
            </Button>
        </div>
    );
};
