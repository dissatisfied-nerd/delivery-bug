import { profileActions } from "entities/Profile";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
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
    const { order, account = "client" } = props;
    const [taken, setTaken] = useState(false);
    const dispatch = useDispatch();

    const onTakeOrder = useCallback(() => {
        setTaken(true);
        dispatch(profileActions.addOrder(order));
    }, [dispatch, setTaken, order]);

    const content =
        account === "client" ? (
            <>
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
                    <div className={cls.goodsImgList}>
                        {order.goods.map((good) => {
                            return (
                                <img
                                    className={cls.goodsImgItem}
                                    src={good.img}
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
                            {order.client.adress.aparts}
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
                        {order.goods.map(([good, count]) => {
                            return (
                                <div>
                                    <span>{count}x: </span>
                                    <span>{good.title}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className={cls.takeOrderWrapper}>
                        {!taken ? (
                            <Button
                                className={cls.takeOrderBtn}
                                onClick={onTakeOrder}
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
