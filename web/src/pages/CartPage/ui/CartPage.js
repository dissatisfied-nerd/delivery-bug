import {
    Cart,
    cartActions,
    getCartCount,
    getCartError,
    getCartIsOrderCreated,
} from "features/Cart";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Page } from "widgets/Page/Page";
import cls from "./CartPage.module.scss";

export const CartPage = () => {
    const cartCount = useSelector(getCartCount);
    const isOrderCreated = useSelector(getCartIsOrderCreated);
    const error = useSelector(getCartError);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(cartActions.initCart());

        return () => {
            isOrderCreated && dispatch(cartActions.setIsOrderCreated(false));
        };
    }, [dispatch, isOrderCreated]);

    return (
        <Page>
            {!cartCount ? (
                <span className={cls.msg}>
                    {isOrderCreated ? "Заказ успешно создан!" : "Корзина пуста"}
                </span>
            ) : (
                <>
                    <span className={cls.title}>Корзина</span>
                    {error && <span className={cls.error}>{error}</span>}
                    <Cart />
                </>
            )}
        </Page>
    );
};
