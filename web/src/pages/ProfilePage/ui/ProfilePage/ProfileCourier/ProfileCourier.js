import { OrderList } from "entities/Order";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "shared/ui/Card/Card";
import { Page } from "widgets/Page/Page";
import cls from "../ProfilePage.module.scss";
import { ProfileCard } from "../../ProfileCard/ProfileCard";
import {
    getCourierData,
    getCourierId,
    getCourierOrders,
} from "entities/Courier";
import { fetchProfileOrders } from "pages/ProfilePage/model/sevices/fetchProfileOrders/fetchProfileOrders";
import { finishOrder } from "../../../model/sevices/finishOrder/finishOrder";

export const ProfileCourier = () => {
    const dispatch = useDispatch();
    const courierID = useSelector(getCourierId);
    const profile = useSelector(getCourierData);
    const orders = useSelector(getCourierOrders);

    useEffect(() => {
        dispatch(fetchProfileOrders("courier"));
    }, []);

    const onCancelOrder = useCallback(
        (orderID) => {
            dispatch(finishOrder({ orderID, courierID }));
        },
        [dispatch, courierID]
    );

    return (
        <Page>
            <Card className={cls.ProfilePageCard}>
                <ProfileCard profile={{ balance: 0, ...profile }} />
                <div className={cls.title}>Активные заказы</div>
                <OrderList
                    page="profile"
                    type="courier"
                    orders={orders.filter(
                        (order) => order.status !== "finished"
                    )}
                    onCancelOrder={onCancelOrder}
                />
                <div className={cls.title}>История заказов</div>
                <OrderList
                    page="profile"
                    type="courier"
                    orders={orders.filter(
                        (order) => order.status === "finished"
                    )}
                />
            </Card>
        </Page>
    );
};
