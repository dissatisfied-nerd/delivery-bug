import { OrderList } from "entities/Order";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "shared/ui/Card/Card";
import { Page } from "widgets/Page/Page";
import cls from "../ProfilePage.module.scss";
import { ProfileCard } from "../../ProfileCard/ProfileCard";
import { getClientData, getClientOrders } from "entities/Client";
import { fetchProfileOrders } from "pages/ProfilePage/model/sevices/fetchProfileOrders/fetchProfileOrders";

export const ProfileClient = () => {
    const dispatch = useDispatch();
    const profile = useSelector(getClientData);
    const orders = useSelector(getClientOrders);

    useEffect(() => {
        dispatch(fetchProfileOrders("client"));
    }, []);

    return (
        <Page>
            <Card className={cls.ProfilePageCard}>
                <ProfileCard profile={{ balance: 0, ...profile }} />
                <div className={cls.title}>Активные заказы</div>
                <OrderList
                    page="profile"
                    type="client"
                    orders={orders.filter(
                        (order) => order.status !== "finished"
                    )}
                />
                <div className={cls.title}>История заказов</div>
                <OrderList
                    page="profile"
                    type="client"
                    orders={orders.filter(
                        (order) => order.status === "finished"
                    )}
                />
            </Card>
        </Page>
    );
};
