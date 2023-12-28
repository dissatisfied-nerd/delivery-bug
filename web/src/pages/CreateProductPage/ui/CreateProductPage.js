import {
    CreateProduct,
    createProductActions,
    getCreateProductIsProductCreated,
} from "features/CreateProduct";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { Page } from "widgets/Page/Page";
import cls from "./CreateProductPage.module.scss";

export const CreateProductPage = () => {
    const dispatch = useDispatch();
    const isOrderCreated = useSelector(getCreateProductIsProductCreated);

    useEffect(() => {
        return () => {
            isOrderCreated &&
                dispatch(createProductActions.setIsProductCreated(false));
        };
    }, [dispatch, isOrderCreated]);

    return (
        <Page className={classNames(cls.CreateProductPage, {}, [])}>
            {isOrderCreated && (
                <div className={cls.message}>
                    Товар успешно создан. Он отобразится в профиле
                </div>
            )}
            <CreateProduct className={cls.createProductForm} />
        </Page>
    );
};
