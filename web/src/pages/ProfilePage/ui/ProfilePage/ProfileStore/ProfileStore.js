import { OrderList } from "entities/Order";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "shared/ui/Card/Card";
import { Page } from "widgets/Page/Page";
import cls from "../ProfilePage.module.scss";
import { ProfileCard } from "../../ProfileCard/ProfileCard";
import { getClientData, getClientOrders } from "entities/Client";
import { fetchProfileOrders } from "pages/ProfilePage/model/sevices/fetchProfileOrders/fetchProfileOrders";
import {
    fetchStoreProducts,
    getStoreData,
    getStoreErrorData,
    getStoreErrorProducts,
    getStoreId,
    getStoreIsLoadingData,
    getStoreIsLoadingProducts,
    getStoreProducts,
} from "entities/Store";
import { ProductList } from "entities/Product";

export const ProfileStore = () => {
    const dispatch = useDispatch();
    const id = useSelector(getStoreId);
    const profile = useSelector(getStoreData);
    const products = useSelector(getStoreProducts);
    console.log(products);
    const errorData = useSelector(getStoreErrorData);
    const errorProducts = useSelector(getStoreErrorProducts);
    const isLoadingData = useSelector(getStoreIsLoadingData);
    const isLoadingProducts = useSelector(getStoreIsLoadingProducts);

    useEffect(() => {
        dispatch(fetchStoreProducts(id));
    }, []);

    return (
        <Page>
            <Card className={cls.ProfilePageCard}>
                <span className={cls.pageTitle}> Профиль </span>
                <ProfileCard
                    profile={profile}
                    error={errorData || errorProducts}
                    type={"store"}
                    isLoading={isLoadingData}
                />
                <div className={cls.title}>Товары</div>
                <ProductList
                    products={products}
                    type="big"
                    isLoading={isLoadingProducts}
                />
            </Card>
        </Page>
    );
};
