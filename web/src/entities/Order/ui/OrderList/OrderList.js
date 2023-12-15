import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { OrderListItem } from "../OrderListItem/OrderListItem";
import cls from "./OrderList.module.scss";

export const OrderList = (props) => {
    const {
        className,
        orders,
        type,
        page,
        onTakeOrder = () => {},
        onCancelOrder = () => {},
    } = props;
    return (
        <div className={classNames(cls.OrderList, {}, [className])}>
            {orders.length ? (
                orders.map((order) => {
                    return (
                        <OrderListItem
                            page={page}
                            order={order}
                            type={type}
                            onTakeOrder={onTakeOrder}
                            onCancelOrder={onCancelOrder}
                        />
                    );
                })
            ) : (
                <span>Заказов нет</span>
            )}
        </div>
    );
};
