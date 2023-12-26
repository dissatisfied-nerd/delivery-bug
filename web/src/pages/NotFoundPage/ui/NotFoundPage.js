import { getAuthInited, getAuthIsAuth } from "features/Auth";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Page } from "widgets/Page/Page";

export const NotFoundPage = () => {
    const isAuth = useSelector(getAuthIsAuth);
    const inited = useSelector(getAuthInited);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("isAuth", isAuth);
        if (inited && !isAuth) {
            console.log("isAuth1", isAuth);
            navigate("/auth", { replace: true });
        }
    }, [isAuth, navigate, inited]);

    return <Page>Страница не найдена</Page>;
};
