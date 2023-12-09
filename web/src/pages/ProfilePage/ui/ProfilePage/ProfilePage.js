import { OrderList } from "entities/Order";
import { getAuthData, getAuthType } from "features/Auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "shared/ui/Card/Card";
import { Page } from "widgets/Page/Page";
import cls from "./ProfilePage.module.scss";
import { ProfileCard } from "../ProfileCard/ProfileCard";
import { getClientData, getClientId, getClientOrders } from "entities/Client";
import { getCourierData, getCourierOrders } from "entities/Courier";
import { getProfileData } from "../../model/sevices/getProfileData/getProfileData";

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const type = useSelector(getAuthType);
    const client_id = useSelector(getClientId);
    const courier_id = useSelector(getCourierData);
    const id = type === "client" ? client_id : courier_id;

    useEffect(() => {
        dispatch(getProfileData(id));
    }, [dispatch, id]);

    const client = useSelector(getClientData);
    const courier = useSelector(getCourierData);
    const profile = type === "client" ? client : courier;
    const clientOrders = useSelector(getClientOrders);
    const courierOrders = useSelector(getCourierOrders);
    const orders = type === "client" ? clientOrders : courierOrders;

    return (
        <Page>
            <Card className={cls.ProfilePageCard}>
                <ProfileCard profile={{ balance: 0, ...profile }} />
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
