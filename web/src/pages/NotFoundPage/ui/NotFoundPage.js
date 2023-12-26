import { getAuthIsAuth } from "features/Auth";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Page } from "widgets/Page/Page";

export const NotFoundPage = () => {
    const isAuth = useSelector(getAuthIsAuth);
    const navigate = useNavigate();

    if (!isAuth) {
        navigate("/auth", { replace: true });
    }

    return <Page>Страница не найдена</Page>;
};
