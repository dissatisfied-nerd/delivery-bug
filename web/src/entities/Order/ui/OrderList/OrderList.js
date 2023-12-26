import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Loader } from "shared/ui/Loader/Loader";
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
        isLoading,
    } = props;

    if (isLoading) {
        return (
            <div className={classNames(cls.OrderList, {}, [className])}>
                <Loader />
            </div>
        );
    }

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
                            key={order.order_id || order.id}
                        />
                    );
                })
            ) : (
                <span>Заказов нет</span>
            )}
        </div>
    );
};
