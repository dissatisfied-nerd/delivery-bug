import { CreateGood } from "features/CreateGood";
import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Page } from "widgets/Page/Page";
import cls from "./CreateGoodPage.module.scss";

export const CreateGoodPage = () => {
    return (
        <Page className={classNames(cls.CreateGoodPage, {}, [])}>
            <CreateGood className={cls.createGoodForm} />
        </Page>
    );
};
