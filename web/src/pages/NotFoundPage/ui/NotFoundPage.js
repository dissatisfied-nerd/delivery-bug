import { getAuthInited, getAuthIsAuth, getAuthType } from "features/Auth";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Page } from "widgets/Page/Page";

export const NotFoundPage = () => {
    const isAuth = useSelector(getAuthIsAuth);
    const type = useSelector(getAuthType);
    const inited = useSelector(getAuthInited);
    const navigate = useNavigate();

    useEffect(() => {
        if (inited && !isAuth) {
            if (type === "store") {
                navigate("/store/auth", { replace: true });
            } else if (type === "admin") {
                navigate("/admin/auth", { replace: true });
            } else {
                navigate("/auth", { replace: true });
            }
        }
    }, [isAuth, navigate, inited, type]);

    return <Page>Страница не найдена</Page>;
};
