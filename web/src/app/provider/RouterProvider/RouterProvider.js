import { AuthPage } from "pages/AuthPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

export const RouterProvider = () => {
    return (
        <Routes>
            <Route element={<AuthPage />} path="/" />
        </Routes>
    );
};
