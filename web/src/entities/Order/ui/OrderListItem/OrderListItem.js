import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Card } from "shared/ui/Card/Card";
import cls from "./OrderListItem.module.scss";

export const OrderListItem = (props) => {
    const { order } = props;
    return (
        <div className={classNames(cls.OrderListItem, {}, [])}>
            <div className={cls.header}>
                <span>Заказ от {order.created}</span>
                <span>{order.cost} ₽</span>
            </div>
            <div className={cls.body}>
                <span>
                    {order.delivered
                        ? `Дата доставки: ${order.delivered}`
                        : order.courierId
                        ? `Статус: В пути`
                        : "Статус: Создан"}
                </span>
                <div className={cls.goods}>
                    {order.goods.map((good) => {
                        return (
                            <img
                                className={cls.goodsItem}
                                src={good.img}
                                alt={good.title}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
