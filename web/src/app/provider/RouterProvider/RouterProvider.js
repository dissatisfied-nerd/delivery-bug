import { getAuthIsAuth, getAuthType } from "features/Auth";
import { AuthPage } from "pages/AuthPage";
import { CartPage } from "pages/CartPage";
import { GoodsPage } from "pages/GoodsPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { OrdersPage } from "pages/OrdersPage";
import { ProfilePage } from "pages/ProfilePage";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

export const RouterProvider = () => {
    const isAuth = useSelector(getAuthIsAuth);
    const type = useSelector(getAuthType);

    let routes = null;

    if (!isAuth) {
        routes = <Route element={<AuthPage />} path="/auth" />;
    } else {
        if (type === "client") {
            routes = (
                <>
                    <Route element={<GoodsPage />} path="/" />
                    <Route element={<ProfilePage />} path="/profile" />
                    <Route element={<CartPage />} path="/cart" />
                </>
            );
        } else {
            routes = (
                <>
                    <Route element={<OrdersPage />} path="/" />
                    <Route element={<ProfilePage />} path="/profile" />
                </>
            );
        }
    }

    return (
        <Routes>
            {routes}
            <Route element={<NotFoundPage />} path="/*" />
        </Routes>
    );
};
