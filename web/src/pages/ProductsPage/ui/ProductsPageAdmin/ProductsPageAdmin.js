import { deleteProduct, getAdminError } from "entities/Admin";
import { ProductList } from "entities/Product";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsPageData } from "../../model/selectors/getProductsPageData";
import { fetchProductsPageData } from "../../model/services/fetchProductsPageData";
import cls from "../ProductsPage.module.scss";

export const ProductsPageAdmin = () => {
    const dispatch = useDispatch();
    const products = useSelector(getProductsPageData);
    const error = useSelector(getAdminError);

    const onDeleteProduct = useCallback(
        (id) => {
            console.log(id);
            dispatch(deleteProduct(id));
            if (!error) {
                dispatch(fetchProductsPageData());
            }
        },
        [dispatch, error]
    );

    return (
        <>
            <div className={cls.error}>{error}</div>
            <ProductList
                className={cls.ProductList}
                products={products}
                type="big"
                isAdmin={true}
                onDeleteProduct={onDeleteProduct}
            />
        </>
    );
};
