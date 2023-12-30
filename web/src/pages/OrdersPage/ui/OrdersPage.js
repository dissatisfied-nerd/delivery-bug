import React, { useCallback, useEffect } from "react";
import cls from "./OrdersPage.module.scss";
import { Page } from "widgets/Page/Page";
import { OrderList } from "entities/Order";
import { useDispatch, useSelector } from "react-redux";
import { getCourierId } from "entities/Courier";
import {
    getOrdersPageData,
    getOrdersPageError,
    getOrdersPageIsLoading,
    getOrdersPageIsOrderTaken,
} from "../model/selectors/getOrdersPageData";
import { fetchOrdersPageData } from "../model/services/fetchOrdersPageData/fetchOrdersPageData";
import { takeOrder } from "../model/services/takeOrder/takeOrder";
import { ordersPageActions } from "../model/slice/ordersPageSlice";
import { Loader } from "shared/ui/Loader/Loader";

export const OrdersPage = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getOrdersPageIsLoading);
    const orders = useSelector(getOrdersPageData);
    const error = useSelector(getOrdersPageError);
    const isOrderTaken = useSelector(getOrdersPageIsOrderTaken);
    const courierID = useSelector(getCourierId);

    useEffect(() => {
        dispatch(fetchOrdersPageData());

        return () => {
            dispatch(ordersPageActions.resetIsOrderTaken());
        };
    }, [dispatch]);

    const onTakeOrder = useCallback(
        (orderID) => {
            dispatch(takeOrder({ orderID, courierID }));
        },
        [courierID, dispatch]
    );

    if (isLoading) {
        return (
            <Page>
                <span className={cls.title}> Заказы </span>
                <Loader />
            </Page>
        );
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
        </Page>
    );
};
