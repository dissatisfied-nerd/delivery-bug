import { GoodList } from "entities/Good";
import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Page } from "widgets/Page/Page";
import cls from "./GoodsPage.module.scss";

export const GoodsPage = () => {
    return (
        <Page className={classNames(cls.GoodsPage, {}, [])}>
            <span className={cls.title}> Товары </span>
            <GoodList
                className={cls.GoodList}
                goods={[
                    {
                        img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                        title: "Гейнер dr.Hoffman со вкусом твикс",
                        price: "1000",
                    },
                    {
                        img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                        title: "Гейнер dr.Hoffman со вкусом твикс",
                        price: "1000",
                    },
                    {
                        img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                        title: "Гейнер dr.Hoffman со вкусом твикс",
                        price: "1000",
                    },
                    {
                        img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                        title: "Гейнер dr.Hoffman со вкусом твикс",
                        price: "1000",
                    },
                    {
                        img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                        title: "Гейнер dr.Hoffman со вкусом твикс",
                        price: "1000",
                    },
                    {
                        img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                        title: "Гейнер dr.Hoffman со вкусом твикс",
                        price: "1000",
                    },
                    {
                        img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                        title: "Гейнер dr.Hoffman со вкусом твикс",
                        price: "1000",
                    },

                    {
                        img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                        title: "Гейнер dr.Hoffman со вкусом твикс",
                        price: "1000",
                    },
                    {
                        img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                        title: "Гейнер dr.Hoffman со вкусом твикс",
                        price: "1000",
                    },
                    {
                        img: "https://ir-2.ozone.ru/s3/multimedia-w/wc1000/6656314532.jpg",
                        title: "Гейнер dr.Hoffman со вкусом твикс",
                        price: "1000",
                    },
                ]}
            />
        </Page>
    );
};
