import { OrderList } from "entities/Order";
import { ProfileCard } from "entities/Profile";
import React from "react";
import { Card } from "shared/ui/Card/Card";
import { Page } from "widgets/Page/Page";
import cls from "./ProfilePage.module.scss";

export const ProfilePage = () => {
    return (
        <Page>
            <Card className={cls.ProfilePageCard}>
                <ProfileCard
                    profile={{
                        firstName: "Артемий",
                        lastName: "Знай",
                        balance: "5000",
                        city: "Королев",
                        street: "пр-т Королева",
                        building: "1",
                        entrance: "3",
                        floor: "5",
                        aparts: "86",
                    }}
                />
                <div className={cls.title}>Активные заказы</div>
                <OrderList
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
                />
            </Card>
        </Page>
    );
};
