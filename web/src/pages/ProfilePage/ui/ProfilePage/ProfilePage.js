import { OrderList } from "entities/Order";
import { getAuthData, getAuthType } from "features/Auth";
import React from "react";
import { useSelector } from "react-redux";
import { Card } from "shared/ui/Card/Card";
import { Page } from "widgets/Page/Page";
import cls from "./ProfilePage.module.scss";
import { ProfileCard } from "../ProfileCard/ProfileCard";
import { getClientOrders } from "entities/Client";
import { getCourierOrders } from "entities/Courier";

export const ProfilePage = () => {
    const profile = useSelector(getAuthData);
    const type = useSelector(getAuthType);
    const clientOrders = useSelector(getClientOrders);
    const courierOrders = useSelector(getCourierOrders);
    const orders = type === "client" ? clientOrders : courierOrders;

    return (
        <Page>
            <Card className={cls.ProfilePageCard}>
                <ProfileCard profile={{ balance: 5000, ...profile }} />
                <div className={cls.title}>Активные заказы</div>
                <OrderList
                    page="profile"
                    type={type}
                    orders={orders.filter((order) => !Boolean(order.delivered))}
                />
                <div className={cls.title}>История заказов</div>
                <OrderList
                    page="profile"
                    type={type}
                    orders={orders.filter((order) => Boolean(order.delivered))}
                />
                {/* <OrderList
                    account={accountType}
                    orders={[
                        {
                            created: "22.11.23",
                            goods: [
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                            ],
                            cost: "1500",
                            delivered: "",
                        },
                        {
                            created: "20.11.23",
                            goods: [
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                            ],
                            cost: "1500",
                            courierId: "5",
                            delivered: "",
                        },
                        {
                            created: "20.11.23",
                            goods: [
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                            ],
                            cost: "1500",
                            delivered: "24.11.23",
                        },
                        {
                            created: "20.11.23",
                            goods: [
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                            ],
                            cost: "1500",
                            delivered: "24.11.23",
                        },
                        {
                            created: "20.11.23",
                            goods: [
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                            ],
                            cost: "1500",
                            delivered: "24.11.23",
                        },
                        {
                            created: "20.11.23",
                            goods: [
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                            ],
                            cost: "1500",
                            delivered: "24.11.23",
                        },
                        {
                            created: "20.11.23",
                            goods: [
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                            ],
                            cost: "1500",
                            delivered: "24.11.23",
                        },
                        {
                            created: "20.11.23",
                            goods: [
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                            ],
                            cost: "1500",
                            delivered: "24.11.23",
                        },
                    ].filter((order) => !Boolean(order.delivered))}
                />
                <div className={cls.title}>История заказов</div>
                <OrderList
                    account={accountType}
                    orders={[
                        {
                            created: "22.11.23",
                            goods: [
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                            ],
                            cost: "1500",
                            delivered: "",
                        },
                        {
                            created: "20.11.23",
                            goods: [
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                            ],
                            cost: "1500",
                            delivered: "24.11.23",
                        },
                        {
                            created: "20.11.23",
                            goods: [
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                            ],
                            cost: "1500",
                            delivered: "24.11.23",
                        },
                        {
                            created: "20.11.23",
                            goods: [
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                            ],
                            cost: "1500",
                            delivered: "24.11.23",
                        },
                        {
                            created: "20.11.23",
                            goods: [
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                            ],
                            cost: "1500",
                            delivered: "24.11.23",
                        },
                        {
                            created: "20.11.23",
                            goods: [
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                            ],
                            cost: "1500",
                            delivered: "24.11.23",
                        },
                        {
                            created: "20.11.23",
                            goods: [
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                            ],
                            cost: "1500",
                            delivered: "24.11.23",
                        },
                        {
                            created: "20.11.23",
                            goods: [
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                                {
                                    img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                                },
                            ],
                            cost: "1500",
                            delivered: "24.11.23",
                        },
                    ].filter((order) => Boolean(order.delivered))}
                /> */}
            </Card>
        </Page>
    );
};
