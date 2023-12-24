import { CreateProduct } from "features/CreateProduct";
import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Page } from "widgets/Page/Page";
import cls from "./CreateProductPage.module.scss";

export const CreateProductPage = () => {
    return (
        <Page className={classNames(cls.CreateProductPage, {}, [])}>
            <CreateProduct className={cls.createProductForm} />
        </Page>
    );
};
