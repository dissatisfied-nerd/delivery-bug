import { getProfileIsAuth, getProfileType } from "entities/Profile";
import { AuthPage } from "pages/AuthPage";
import { CartPage } from "pages/CartPage";
import { GoodsPage } from "pages/GoodsPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePage } from "pages/ProfilePage";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

export const RouterProvider = () => {
    const isAuth = useSelector(getProfileIsAuth);
    const profileType = useSelector(getProfileType);

    let routes = null;

    if (!isAuth) {
        routes = <Route element={<AuthPage />} path="/auth" />;
    } else {
        if (profileType === "client") {
            routes = (
                <>
                    <Route element={<GoodsPage />} path="/goods" />
                    <Route element={<ProfilePage />} path="/profile" />
                    <Route element={<CartPage />} path="/cart" />
                </>
            );
        } else {
            routes = (
                <>
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
