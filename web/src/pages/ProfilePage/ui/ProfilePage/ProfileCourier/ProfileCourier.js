import { OrderList } from "entities/Order";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "shared/ui/Card/Card";
import { Page } from "widgets/Page/Page";
import cls from "../ProfilePage.module.scss";
import { ProfileCard } from "../../ProfileCard/ProfileCard";
import {
    getCourierData,
    getCourierError,
    getCourierId,
    getCourierOrders,
} from "entities/Courier";
import { fetchProfileOrders } from "pages/ProfilePage/model/sevices/fetchProfileOrders/fetchProfileOrders";
import { finishOrder } from "../../../model/sevices/finishOrder/finishOrder";
import { getClientError } from "entities/Client";

export const ProfileCourier = () => {
    const dispatch = useDispatch();
    const courierID = useSelector(getCourierId);
    const profile = useSelector(getCourierData);
    const orders = useSelector(getCourierOrders);
    const error = useRef(null);
    const errorCourier = useSelector(getCourierError);
    const errorClient = useSelector(getClientError);

    useEffect(() => {
        dispatch(fetchProfileOrders("courier"));
    }, []);

    const onCancelOrder = useCallback(
        async (orderID) => {
            const result = await dispatch(finishOrder({ orderID, courierID }));
            console.log(result);
            if (result.meta.rejectedWithValue) {
                error.current.style.display = "block";
                error.current.textContent = result.payload;
            } else {
                error.current.textContent = "";
                error.current.style.display = "none";
            }
        },
        [dispatch, courierID]
    );

    return (
        <Page>
            <Card className={cls.ProfilePageCard}>
                <ProfileCard
                    profile={profile}
                    error={errorCourier || errorClient}
                    type={"courier"}
                />
                <div className={cls.title}>Активные заказы</div>
                <div className={cls.error} ref={error}></div>

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
