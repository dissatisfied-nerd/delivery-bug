import { getProfileIsAuth } from "entities/Profile";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Page } from "widgets/Page/Page";

export const NotFoundPage = () => {
    const isAuth = useSelector(getProfileIsAuth);
    const navigate = useNavigate();

    if (!isAuth) {
        navigate("/auth", { replace: true });
    }

    return <Page>Страница не найдена</Page>;
};
