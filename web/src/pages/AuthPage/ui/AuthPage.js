import { AuthForm } from "features/Auth";
import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Page } from "widgets/Page/Page";
import cls from "./AuthPage.module.scss";

export const AuthPage = () => {
    return (
        <Page className={classNames(cls.AuthPage, {}, [])}>
            <AuthForm />
        </Page>
    );
};
