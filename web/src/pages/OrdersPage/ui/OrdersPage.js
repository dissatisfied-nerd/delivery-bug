import React, { useCallback, useEffect } from "react";
import cls from "./OrdersPage.module.scss";
import { Page } from "widgets/Page/Page";
import { OrderList } from "entities/Order";
import { useDispatch, useSelector } from "react-redux";
import { courierActions } from "entities/Courier";
import {
    getOrdersPageData,
    getOrdersPageError,
} from "../model/selectors/getOrdersPageData";
import { fetchOrdersPageData } from "../model/services/fetchOrdersPageData";

export const OrdersPage = () => {
    const dispatch = useDispatch();
    const orders = useSelector(getOrdersPageData);
    console.log(orders);
    const error = useSelector(getOrdersPageError);

    useEffect(() => {
        dispatch(fetchOrdersPageData());
    }, [dispatch]);

    const onTakeOrder = useCallback(
        (order) => {
            dispatch(courierActions.addOrder(order));
        },
        [dispatch]
    );

    const onCancelOrder = useCallback(() => {}, []);

    if (error) {
        return (
            <Page>
                <span className={cls.title}> Заказы </span>
                <div className={cls.err}>{error}</div>
            </Page>
        );
    }

    return (
        <Page>
            <span className={cls.title}> Заказы </span>
            <OrderList
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
                        goods: [
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
                        goods: [
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
                        goods: [
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
                        goods: [
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
                        goods: [
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
                        goods: [
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
                        goods: [
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
                        goods: [
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
            />
        </Page>
    );
};
