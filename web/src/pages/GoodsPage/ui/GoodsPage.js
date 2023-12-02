import { GoodList } from "entities/Good";
import { cartActions, getCartData } from "features/Cart";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { Page } from "widgets/Page/Page";
import cls from "./GoodsPage.module.scss";

export const GoodsPage = () => {
    const dispatch = useDispatch();
    const cart = useSelector(getCartData);

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
        <Page className={classNames(cls.GoodsPage, {}, [])}>
            <span className={cls.title}> Товары </span>
            <GoodList
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
                cart={cart}
                className={cls.GoodList}
                goods={[
                    {
                        id: 1,
                        img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                        title: "Гейнер dr.Hoffman со вкусом твикс",
                        price: "1000",
                        weight: "2.5",
                    },
                    {
                        id: 2,
                        img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                        title: "Гейнер dr.Hoffman со вкусом твикс",
                        price: "1000",
                        weight: "1.5",
                    },
                    {
                        id: 3,
                        img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                        title: "Гейнер dr.Hoffman со вкусом твикс",
                        price: "1000",
                        weight: "0.7",
                    },
                    {
                        id: 4,
                        img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                        title: "Гейнер dr.Hoffman со вкусом твикс",
                        price: "1000",
                        weight: "2.5",
                    },
                    {
                        id: 5,
                        img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                        title: "Гейнер dr.Hoffman со вкусом твикс",
                        price: "1000",
                        weight: "2.5",
                    },
                ]}
                on
            />
        </Page>
    );
};
