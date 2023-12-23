import { GoodList } from "entities/Good";
import { getAuthType } from "features/Auth";
import { cartActions, getCartData } from "features/Cart";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { Page } from "widgets/Page/Page";
import { getGoodsPageData } from "../model/selectors/getGoodsPageData";
import { fetchGoodsPageData } from "../model/services/fetchGoodsPageData";
import cls from "./GoodsPage.module.scss";
import { GoodsPageAdmin } from "./GoodsPageAdmin/GoodsPageAdmin";
import { GoodsPageClient } from "./GoodsPageClient/GoodsPageClient";

export const GoodsPage = () => {
    const dispatch = useDispatch();
    const type = useSelector(getAuthType);
    // TESTING
    // const type = "admin";
    console.log(type);

    useEffect(() => {
        dispatch(fetchGoodsPageData());
    }, [dispatch]);

    return (
        <Page className={classNames(cls.GoodsPage, {}, [])}>
            <span className={cls.title}> Товары </span>
            {type === "admin" ? <GoodsPageAdmin /> : <GoodsPageClient />}
        </Page>
    );
};
