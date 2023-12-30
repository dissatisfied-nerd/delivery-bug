import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { getFormatedData } from "shared/lib/getFormattedDate/getFormattedDate";
import { Button } from "shared/ui/Button/Button";
import cls from "./OrderListItem.module.scss";

const getWeight = (products) => {
    let weight = 0;
    products.forEach(({ amount, ...product }) => {
        weight += Number(product.weight) * 1000 * amount;
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
                    <span>{order.price.toLocaleString("ru")} ₽</span>
                </div>
                <div className={cls.body}>
                    <span>
                        {order.delivery_time
                            ? `Дата доставки: ${deliveryTime}`
                            : order.status === "taken"
                            ? `Статус: В пути`
                            : "Статус: Создан"}
                    </span>
                    <div className={cls.productsImgList}>
                        {order.products.map((product) => {
                            return (
                                <img
                                    key={product.id}
                                    className={cls.productsImgItem}
                                    src={product.image}
                                    alt={product.name}
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
                    <span>{order.price.toLocaleString("ru")} ₽</span>
                </div>
                <div className={cls.body}>
                    <div className={cls.productsTitleList}>
                        {order.products.map(({ amount, ...product }) => {
                            return (
                                <div key={product.id}>
                                    <span>{amount}x: </span>
                                    <span>{product.name}</span>
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
