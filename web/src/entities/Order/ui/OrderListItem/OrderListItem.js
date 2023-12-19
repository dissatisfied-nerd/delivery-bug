import { profileActions } from "entities/Client";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { getFormatedData } from "shared/lib/getFormattedDate/getFormattedDate";
import { Button } from "shared/ui/Button/Button";
import { Card } from "shared/ui/Card/Card";
import cls from "./OrderListItem.module.scss";

const getWeight = (goods) => {
    let weight = 0;
    goods.forEach(([good, count]) => {
        weight += Number(good.weight) * 1000 * count;
    });

    return (weight / 1000).toFixed(2);
};

export const OrderListItem = (props) => {
    const {
        order,
        type = "client",
        taken = false,
        page,
        onTakeOrder,
        onCancelOrder,
    } = props;
    const creationTime = getFormatedData(order.creation_time);
    const deliveryTime = getFormatedData(order.delivery_time);

    const content =
        type === "client" ? (
            <>
                <div className={cls.header}>
                    <span>Заказ от {creationTime}</span>
                    <span>{order.price} ₽</span>
                </div>
                <div className={cls.body}>
                    <span>
                        {order.delivered
                            ? `Дата доставки: ${deliveryTime}`
                            : order.courierId
                            ? `Статус: В пути`
                            : "Статус: Создан"}
                    </span>
                    <div className={cls.goodsImgList}>
                        {order.products.map((good) => {
                            return (
                                <img
                                    className={cls.goodsImgItem}
                                    src={good.image}
                                    alt={good.title}
                                />
                            );
                        })}
                    </div>
                </div>
            </>
        ) : (
            <>
                <div className={cls.header}>
                    <span>Заказ от {order.created}</span>
                    <span>
                        Адрес{" "}
                        <span className={cls.headerText}>
                            {order.client.adress.city}, ул.{" "}
                            {order.client.adress.street}, д.{" "}
                            {order.client.adress.building}, подъезд{" "}
                            {order.client.adress.entrance}, этаж{" "}
                            {order.client.adress.floor}, кв{" "}
                            {order.client.adress.apartment}
                        </span>
                    </span>
                    <span>
                        Вес{" "}
                        <span className={cls.headerText}>
                            {getWeight(order.goods)} кг
                        </span>
                    </span>
                    <span>{order.cost} ₽</span>
                </div>
                <div className={cls.body}>
                    <div className={cls.goodsTitleList}>
                        {order.products.map(({ amount, ...good }) => {
                            return (
                                <div>
                                    <span>{amount}x: </span>
                                    <span>{good.title}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className={cls.takeOrderWrapper}>
                        {page === "profile" ? (
                            <Button
                                className={cls.takeOrderBtn}
                                onClick={() => onCancelOrder(order.id)}
                            >
                                Завершить
                            </Button>
                        ) : !taken ? (
                            <Button
                                className={cls.takeOrderBtn}
                                onClick={() => onTakeOrder(order.id)}
                            >
                                Взять заказ
                            </Button>
                        ) : (
                            <span>Вы взяли заказ</span>
                        )}
                    </div>
                </div>
            </>
        );
    return (
        <div className={classNames(cls.OrderListItem, {}, [])}>{content}</div>
    );
};
