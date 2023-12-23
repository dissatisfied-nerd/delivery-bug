import { ProductList } from "entities/Product";
import { getAuthType } from "features/Auth";
import { cartActions, getCartData } from "features/Cart";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { Page } from "widgets/Page/Page";
import { getProductsPageData } from "../model/selectors/getProductsPageData";
import { fetchProductsPageData } from "../model/services/fetchProductsPageData";
import cls from "./ProductsPage.module.scss";
import { ProductsPageAdmin } from "./ProductsPageAdmin/ProductsPageAdmin";
import { ProductsPageClient } from "./ProductsPageClient/ProductsPageClient";

export const ProductsPage = () => {
    const dispatch = useDispatch();
    const type = useSelector(getAuthType);
    // TESTING
    // const type = "admin";
    console.log(type);

    useEffect(() => {
        dispatch(fetchProductsPageData());
    }, [dispatch]);

    return (
        <Page className={classNames(cls.ProductsPage, {}, [])}>
            <span className={cls.title}> Товары </span>
            {type === "admin" ? <ProductsPageAdmin /> : <ProductsPageClient />}
        </Page>
    );
};
