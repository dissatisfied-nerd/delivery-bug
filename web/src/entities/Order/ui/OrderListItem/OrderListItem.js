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
    goods.forEach(({ amount, ...good }) => {
        weight += Number(good.weight) * 1000 * amount;
    });

    return (weight / 1000).toFixed(2);
};

export const OrderListItem = (props) => {
    const { order, type = "client", page, onTakeOrder, onCancelOrder } = props;
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
                        {order.delivery_time
                            ? `Дата доставки: ${deliveryTime}`
                            : order.status === "taken"
                            ? `Статус: В пути`
                            : "Статус: Создан"}
                    </span>
                    <div className={cls.goodsImgList}>
                        {order.products.map((good) => {
                            return (
                                <img
                                    key={good.id}
                                    className={cls.goodsImgItem}
                                    src={good.image}
                                    alt={good.name}
                                />
                            );
                        })}
                    </div>
                </div>
            </>
        ) : (
            <>
                <div className={cls.header}>
                    <span>Заказ от {creationTime}</span>
                    <span>
                        Адрес{" "}
                        <span className={cls.headerText}>
                            {order.client.city}, ул. {order.client.street}, д.{" "}
                            {order.client.building}, подъезд{" "}
                            {order.client.entrance}, этаж {order.client.floor},
                            кв {order.client.apartment}
                        </span>
                    </span>
                    <span>
                        Вес{" "}
                        <span className={cls.headerText}>
                            {getWeight(order.products)} кг
                        </span>
                    </span>
                    <span>{order.price} ₽</span>
                </div>
                <div className={cls.body}>
                    <div className={cls.goodsTitleList}>
                        {order.products.map(({ amount, ...good }) => {
                            return (
                                <div key={good.id}>
                                    <span>{amount}x: </span>
                                    <span>{good.name}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className={cls.takeOrderWrapper}>
                        {page === "profile" ? (
                            order.status !== "finished" && (
                                <Button
                                    className={cls.takeOrderBtn}
                                    onClick={() =>
                                        onCancelOrder(order.order_id)
                                    }
                                >
                                    Завершить
                                </Button>
                            )
                        ) : (
                            <Button
                                className={cls.takeOrderBtn}
                                onClick={() => onTakeOrder(order.id)}
                            >
                                Взять заказ
                            </Button>
                        )}
                    </div>
                </div>
            </>
        );
    return (
        <div className={classNames(cls.OrderListItem, {}, [])}>{content}</div>
    );
};
