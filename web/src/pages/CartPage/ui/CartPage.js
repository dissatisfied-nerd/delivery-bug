import { Cart, cartActions, getCartData } from "features/Cart";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Page } from "widgets/Page/Page";
import cls from "./CartPage.module.scss";

export const CartPage = () => {
    const cart = useSelector(getCartData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(cartActions.initCart());
    }, [dispatch]);

    return (
        <Page>
            {!Object.keys(cart).length ? (
                <span className={cls.empty}>Корзина пуста</span>
            ) : (
                <>
                    <span className={cls.title}>Корзина</span>
                    <Cart cart={cart} />
                </>
            )}
        </Page>
    );
};
