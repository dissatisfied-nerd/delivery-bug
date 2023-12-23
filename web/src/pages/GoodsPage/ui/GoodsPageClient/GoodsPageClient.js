import { GoodList } from "entities/Good";
import { cartActions, getCartData } from "features/Cart";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGoodsPageData } from "../../model/selectors/getGoodsPageData";
import cls from "../GoodsPage.module.scss";

export const GoodsPageClient = () => {
    const dispatch = useDispatch();
    const cart = useSelector(getCartData);
    const goods = useSelector(getGoodsPageData);

    useEffect(() => {
        dispatch(cartActions.initCart());
    }, [dispatch]);

    const onAddToCart = useCallback(
        (good) => {
            dispatch(cartActions.addToCart(good));
        },
        [dispatch]
    );

    const onRemoveFromCart = useCallback(
        (id) => {
            dispatch(cartActions.removeFromCart(id));
        },
        [dispatch]
    );

    return (
        <GoodList
            onAddToCart={onAddToCart}
            onRemoveFromCart={onRemoveFromCart}
            cart={cart}
            className={cls.GoodList}
            goods={goods}
        />
    );
};
