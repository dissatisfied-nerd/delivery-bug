import React, { useCallback, useEffect } from "react";
import cls from "./OrdersPage.module.scss";
import { Page } from "widgets/Page/Page";
import { OrderList } from "entities/Order";
import { useDispatch, useSelector } from "react-redux";
import { courierActions, getCourierId } from "entities/Courier";
import {
    getOrdersPageData,
    getOrdersPageError,
    getOrdersPageIsLoading,
    getOrdersPageIsOrderTaken,
} from "../model/selectors/getOrdersPageData";
import { fetchOrdersPageData } from "../model/services/fetchOrdersPageData/fetchOrdersPageData";
import { takeOrder } from "../model/services/takeOrder/takeOrder";
import { ordersPageActions } from "../model/slice/ordersPageSlice";

export const OrdersPage = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getOrdersPageIsLoading);
    const orders = useSelector(getOrdersPageData);
    console.log(orders);
    console.log(isLoading);
    const error = useSelector(getOrdersPageError);
    const isOrderTaken = useSelector(getOrdersPageIsOrderTaken);
    console.log("isOrderTaken", isOrderTaken);
    const courierID = useSelector(getCourierId);

    useEffect(() => {
        dispatch(fetchOrdersPageData());

        return () => {
            dispatch(ordersPageActions.resetIsOrderTaken());
        };
    }, [dispatch]);

    const onTakeOrder = useCallback(
        (orderID) => {
            console.log(orderID);
            dispatch(takeOrder({ orderID, courierID }));
        },
        [courierID, dispatch]
    );

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error && !orders.length) {
        return (
            <Page>
                <span className={cls.title}> Заказы </span>
                {error && <div className={cls.err}>{error}</div>}
            </Page>
        );
    }

    return (
        <Page>
            <span className={cls.title}> Заказы </span>
            {error && <div className={cls.err}>{error}</div>}
            {isOrderTaken && (
                <div className={cls.message}>
                    Вы успешно взяли заказ, он отобразится в профиле
                </div>
            )}
            <OrderList
                className={cls.orderList}
                type="courier"
                onTakeOrder={onTakeOrder}
                orders={orders}
            />
            {/* <OrderList
                className={cls.orderList}
                type="courier"
                onTakeOrder={onTakeOrder}
                onCancelOrder={onCancelOrder}
                orders={[
                    {
                        created: "22.11.23",
                        client: {
                            adress: {
                                city: "Москва",
                                street: "Охотный ряд",
                                building: "1",
                                entrance: "1",
                                floor: "1",
                                apartment: "1",
                            },
                        },
                        products: [
                            [
                                {
                                    title: "Гейнер dr. Hoffman 2.5 кг",
                                    image: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                    weight: "2.5",
                                },
                                2,
                            ],
                            [
                                {
                                    title: "Доска для мазохистов",
                                    image: "https://ir.ozone.ru/s3/multimedia-n/wc500/6550600835.jpg",
                                    weight: "1.0",
                                },
                                3,
                            ],
                            [
                                {
                                    title: "Креатин славянский",
                                    image: "https://ir.ozone.ru/s3/multimedia-n/wc1000/6814604543.jpg",
                                    weight: "0.8",
                                },
                                1,
                            ],
                        ],
                        cost: "1500",
                        delivered: "",
                    },
                    {
                        created: "22.11.23",
                        client: {
                            adress: {
                                city: "Москва",
                                street: "Охотный ряд",
                                building: "1",
                                entrance: "1",
                                floor: "1",
                                apartment: "1",
                            },
                        },
                        products: [
                            [
                                {
                                    title: "Гейнер dr. Hoffman 2.5 кг",
                                    image: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                    weight: "2.5",
                                },
                                2,
                            ],
                            [
                                {
                                    title: "Доска для мазохистов",
                                    image: "https://ir.ozone.ru/s3/multimedia-n/wc500/6550600835.jpg",
                                    weight: "1.0",
                                },
                                3,
                            ],
                            [
                                {
                                    title: "Креатин славянский",
                                    image: "https://ir.ozone.ru/s3/multimedia-n/wc1000/6814604543.jpg",
                                    weight: "0.8",
                                },
                                1,
                            ],
                        ],
                        cost: "1500",
                        delivered: "",
                    },
                    {
                        created: "22.11.23",
                        client: {
                            adress: {
                                city: "Москва",
                                street: "Охотный ряд",
                                building: "1",
                                entrance: "1",
                                floor: "1",
                                apartment: "1",
                            },
                        },
                        products: [
                            [
                                {
                                    title: "Гейнер dr. Hoffman 2.5 кг",
                                    image: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                    weight: "2.5",
                                },
                                2,
                            ],
                            [
                                {
                                    title: "Доска для мазохистов",
                                    image: "https://ir.ozone.ru/s3/multimedia-n/wc500/6550600835.jpg",
                                    weight: "1.0",
                                },
                                3,
                            ],
                            [
                                {
                                    title: "Креатин славянский",
                                    image: "https://ir.ozone.ru/s3/multimedia-n/wc1000/6814604543.jpg",
                                    weight: "0.8",
                                },
                                1,
                            ],
                        ],
                        cost: "1500",
                        delivered: "",
                    },
                    {
                        created: "22.11.23",
                        client: {
                            adress: {
                                city: "Москва",
                                street: "Охотный ряд",
                                building: "1",
                                entrance: "1",
                                floor: "1",
                                apartment: "1",
                            },
                        },
                        products: [
                            [
                                {
                                    title: "Гейнер dr. Hoffman 2.5 кг",
                                    image: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                    weight: "2.5",
                                },
                                2,
                            ],
                            [
                                {
                                    title: "Доска для мазохистов",
                                    image: "https://ir.ozone.ru/s3/multimedia-n/wc500/6550600835.jpg",
                                    weight: "1.0",
                                },
                                3,
                            ],
                            [
                                {
                                    title: "Креатин славянский",
                                    image: "https://ir.ozone.ru/s3/multimedia-n/wc1000/6814604543.jpg",
                                    weight: "0.8",
                                },
                                1,
                            ],
                        ],
                        cost: "1500",
                        delivered: "",
                    },
                    {
                        created: "22.11.23",
                        client: {
                            adress: {
                                city: "Москва",
                                street: "Охотный ряд",
                                building: "1",
                                entrance: "1",
                                floor: "1",
                                apartment: "1",
                            },
                        },
                        products: [
                            [
                                {
                                    title: "Гейнер dr. Hoffman 2.5 кг",
                                    image: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                    weight: "2.5",
                                },
                                2,
                            ],
                            [
                                {
                                    title: "Доска для мазохистов",
                                    image: "https://ir.ozone.ru/s3/multimedia-n/wc500/6550600835.jpg",
                                    weight: "1.0",
                                },
                                3,
                            ],
                            [
                                {
                                    title: "Креатин славянский",
                                    image: "https://ir.ozone.ru/s3/multimedia-n/wc1000/6814604543.jpg",
                                    weight: "0.8",
                                },
                                1,
                            ],
                        ],
                        cost: "1500",
                        delivered: "",
                    },
                    {
                        created: "22.11.23",
                        client: {
                            adress: {
                                city: "Москва",
                                street: "Охотный ряд",
                                building: "1",
                                entrance: "1",
                                floor: "1",
                                apartment: "1",
                            },
                        },
                        products: [
                            [
                                {
                                    title: "Гейнер dr. Hoffman 2.5 кг",
                                    image: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                    weight: "2.5",
                                },
                                2,
                            ],
                            [
                                {
                                    title: "Доска для мазохистов",
                                    image: "https://ir.ozone.ru/s3/multimedia-n/wc500/6550600835.jpg",
                                    weight: "1.0",
                                },
                                3,
                            ],
                            [
                                {
                                    title: "Креатин славянский",
                                    image: "https://ir.ozone.ru/s3/multimedia-n/wc1000/6814604543.jpg",
                                    weight: "0.8",
                                },
                                1,
                            ],
                        ],
                        cost: "1500",
                        delivered: "",
                    },
                    {
                        created: "22.11.23",
                        client: {
                            adress: {
                                city: "Москва",
                                street: "Охотный ряд",
                                building: "1",
                                entrance: "1",
                                floor: "1",
                                apartment: "1",
                            },
                        },
                        products: [
                            [
                                {
                                    title: "Гейнер dr. Hoffman 2.5 кг",
                                    image: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                    weight: "2.5",
                                },
                                2,
                            ],
                            [
                                {
                                    title: "Доска для мазохистов",
                                    image: "https://ir.ozone.ru/s3/multimedia-n/wc500/6550600835.jpg",
                                    weight: "1.0",
                                },
                                3,
                            ],
                            [
                                {
                                    title: "Креатин славянский",
                                    image: "https://ir.ozone.ru/s3/multimedia-n/wc1000/6814604543.jpg",
                                    weight: "0.8",
                                },
                                1,
                            ],
                        ],
                        cost: "1500",
                        delivered: "",
                    },
                    {
                        created: "22.11.23",
                        client: {
                            adress: {
                                city: "Москва",
                                street: "Охотный ряд",
                                building: "1",
                                entrance: "1",
                                floor: "1",
                                apartment: "1",
                            },
                        },
                        products: [
                            [
                                {
                                    title: "Гейнер dr. Hoffman 2.5 кг",
                                    image: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                    weight: "2.5",
                                },
                                2,
                            ],
                            [
                                {
                                    title: "Доска для мазохистов",
                                    image: "https://ir.ozone.ru/s3/multimedia-n/wc500/6550600835.jpg",
                                    weight: "1.0",
                                },
                                3,
                            ],
                            [
                                {
                                    title: "Креатин славянский",
                                    image: "https://ir.ozone.ru/s3/multimedia-n/wc1000/6814604543.jpg",
                                    weight: "0.8",
                                },
                                1,
                            ],
                        ],
                        cost: "1500",
                        delivered: "",
                    },
                ]}
            /> */}
        </Page>
    );
};
