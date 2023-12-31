import { getAuthIsAuth, getAuthType } from "features/Auth";
import { AuthPage } from "pages/AuthPage";
import { CartPage } from "pages/CartPage";
import { CreateProductPage } from "pages/CreateProductPage";
import { ProductsPage } from "pages/ProductsPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { OrdersPage } from "pages/OrdersPage";
import { ProfilePage } from "pages/ProfilePage";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ProductDetailsPage } from "pages/ProductDetailsPage";

export const RouterProvider = () => {
    const isAuth = useSelector(getAuthIsAuth);
    const type = useSelector(getAuthType);

    let routes = null;

    if (!isAuth) {
        routes = (
            <>
                <Route element={<AuthPage />} path="/auth" />
                <Route element={<AuthPage />} path="/store/auth" />
                <Route element={<AuthPage />} path="/admin/auth" />
            </>
        );
    } else {
        if (type === "client") {
            routes = (
                <>
                    <Route
                        element={<ProductDetailsPage />}
                        path="/product/:id"
                    />
                    <Route element={<ProductsPage />} path="/products" />
                    <Route element={<ProfilePage />} path="/profile" />
                    <Route element={<CartPage />} path="/cart" />
                </>
            );
        } else if (type === "courier") {
            routes = (
                <>
                    <Route element={<OrdersPage />} path="/orders" />
                    <Route element={<ProfilePage />} path="/profile" />
                </>
            );
        } else if (type === "store") {
            routes = (
                <>
                    <Route
                        element={<CreateProductPage />}
                        path="/create-product"
                    />
                    <Route element={<ProfilePage />} path="/profile" />
                </>
            );
        } else if (type === "admin") {
            routes = (
                <>
                    <Route element={<ProductsPage />} path="/delete-product" />
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
