import { ProductList } from "entities/Product";
import { deleteProduct } from "../../model/services/deleteProducts/deleteProduct";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsPageData } from "../../model/selectors/getProductsPageData";
import { fetchProductsPageData } from "../../model/services/fetchProductsPageData/fetchProductsPageData";
import cls from "../ProductsPage.module.scss";

export const ProductsPageAdmin = ({ isLoading }) => {
    const dispatch = useDispatch();
    const products = useSelector(getProductsPageData);

    const onDeleteProduct = useCallback(
        async (id) => {
            const result = await dispatch(deleteProduct(id));
            if (!result.meta.rejectedWithValue) {
                dispatch(fetchProductsPageData());
            }
        },
        [dispatch]
    );

    return (
        <>
            <ProductList
                className={cls.ProductList}
                products={products}
                type="big"
                isAdmin={true}
                onDeleteProduct={onDeleteProduct}
                isLoading={isLoading}
            />
        </>
    );
};
