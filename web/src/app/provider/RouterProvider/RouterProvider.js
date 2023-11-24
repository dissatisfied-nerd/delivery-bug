import { AuthPage } from "pages/AuthPage";
import { GoodsPage } from "pages/GoodsPage";
import { ProfilePage } from "pages/ProfilePage";
import React from "react";
import { Route, Routes } from "react-router-dom";

export const RouterProvider = () => {
    return (
        <Routes>
            <Route element={<AuthPage />} path="/" />
            <Route element={<GoodsPage />} path="/goods" />
            <Route element={<ProfilePage />} path="/profile" />
        </Routes>
    );
};
