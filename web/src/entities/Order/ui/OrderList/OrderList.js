import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { OrderListItem } from "../OrderListItem/OrderListItem";
import cls from "./OrderList.module.scss";

export const OrderList = (props) => {
    const { className, orders } = props;
    return (
        <div className={classNames(cls.OrderList, {}, [])}>
            {orders.length ? (
                orders.map((order) => {
                    return <OrderListItem order={order} />;
                })
            ) : (
                <span>Заказов нет</span>
            )}
        </div>
    );
};
