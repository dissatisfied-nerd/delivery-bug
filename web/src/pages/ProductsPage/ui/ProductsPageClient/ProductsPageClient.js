import { ProductList } from "entities/Product";
import { cartActions, getCartData } from "features/Cart";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsPageData } from "../../model/selectors/getProductsPageData";
import cls from "../ProductsPage.module.scss";

export const ProductsPageClient = ({ isLoading }) => {
    const dispatch = useDispatch();
    const cart = useSelector(getCartData);
    const products = useSelector(getProductsPageData);

    useEffect(() => {
        dispatch(cartActions.initCart());
    }, [dispatch]);

    const onAddToCart = useCallback(
        (product) => {
            dispatch(cartActions.addToCart(product));
        },
        [dispatch]
    );

    const onRemoveFromCart = useCallback(
        (id) => {
            dispatch(cartActions.removeFromCart(id));
        },
        [dispatch]
    );

    return (
        <ProductList
            onAddToCart={onAddToCart}
            onRemoveFromCart={onRemoveFromCart}
            cart={cart}
            className={cls.ProductList}
            products={products}
            isLoading={isLoading}
        />
    );
};
