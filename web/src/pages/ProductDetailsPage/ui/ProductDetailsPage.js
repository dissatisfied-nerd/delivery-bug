import { ProductDetails } from "entities/Product";
import { cartActions, getCartData } from "features/Cart";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Page } from "widgets/Page/Page";

export const ProductDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const cart = useSelector(getCartData);

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
        <Page>
            <ProductDetails
                id={id}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
                count={cart[id]?.[1] || 0}
            />
        </Page>
    );
};
