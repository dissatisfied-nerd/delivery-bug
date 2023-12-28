import { OrderList } from "entities/Order";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "shared/ui/Card/Card";
import { Page } from "widgets/Page/Page";
import cls from "../ProfilePage.module.scss";
import { ProfileCard } from "../../ProfileCard/ProfileCard";
import {
    getClientData,
    getClientErrorData,
    getClientErrorOrders,
    getClientOrders,
    getClientIsLoadingData,
    getClientIsLoadingOrders,
} from "entities/Client";
import { fetchProfileOrders } from "../../../model/sevices/fetchProfileOrders/fetchProfileOrders";

export const ProfileClient = () => {
    const dispatch = useDispatch();
    const profile = useSelector(getClientData);
    const orders = useSelector(getClientOrders);
    const errorData = useSelector(getClientErrorData);
    const errorOrders = useSelector(getClientErrorOrders);
    const isLoadingData = useSelector(getClientIsLoadingData);
    const isLoadingOrders = useSelector(getClientIsLoadingOrders);

    useEffect(() => {
        dispatch(fetchProfileOrders("client"));
    }, []);

    return (
        <Page>
            <Card className={cls.ProfilePageCard}>
                <span className={cls.pageTitle}> Профиль </span>
                <ProfileCard
                    type="client"
                    profile={profile}
                    error={errorData || errorOrders}
                    isLoading={isLoadingData}
                />
                <div className={cls.title}>Активные заказы</div>
                <OrderList
                    page="profile"
                    type="client"
                    orders={orders.filter(
                        (order) => order.status !== "finished"
                    )}
                    isLoading={isLoadingOrders}
                />
                <div className={cls.title}>История заказов</div>
                <OrderList
                    page="profile"
                    type="client"
                    orders={orders.filter(
                        (order) => order.status === "finished"
                    )}
                    isLoading={isLoadingOrders}
                />
            </Card>
        </Page>
    );
};
