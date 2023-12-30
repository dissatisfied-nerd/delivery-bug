import { productDetailsActions } from "../../model/slice/productDetailsSlice";
import React, { useEffect } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ProductDetails.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../../model/services/fetchProductData/fetchProductData";
import {
    getProductDetailsData,
    getProductDetailsError,
    getProductDetailsIsLoading,
} from "../../model/selectors/getProductDetailsData";
import { Loader } from "shared/ui/Loader/Loader";
import { Button } from "shared/ui/Button/Button";

const getInfoTitle = (title) => {
    return title.padEnd(50 - title.length, ".") + " ";
};

export const ProductDetails = (props) => {
    const { className, id, onAddToCart, onRemoveFromCart, count } = props;
    const dispatch = useDispatch();
    const isLoading = useSelector(getProductDetailsIsLoading);
    const error = useSelector(getProductDetailsError);
    const product = useSelector(getProductDetailsData);

    useEffect(() => {
        dispatch(productDetailsActions.setInited(true));
        dispatch(fetchProductData(id));

        return () => {
            dispatch(productDetailsActions.setInited(false));
        };
    }, [dispatch, id]);

    if (isLoading) {
        return (
            <div className={classNames(cls.ProductDetails, {}, [className])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.ProductDetails, {}, [className])}>
                {error}
            </div>
        );
    }

    return (
        <div className={classNames(cls.ProductDetails, {}, [className])}>
            <div className={cls.name}>{product.name}</div>
            <div className={cls.main}>
                <img
                    className={cls.image}
                    src={product.image}
                    alt={product.name}
                />

                <div className={cls.wrapper}>
                    <div className={cls.addToCartWrapper}>
                        <div className={cls.price}>
                            {product.price.toLocaleString("ru")} ₽
                        </div>

                        {!count ? (
                            <Button
                                theme="primary"
                                onClick={(event) => onAddToCart(product)}
                            >
                                В корзину
                            </Button>
                        ) : (
                            <div className={cls.counterWrapper}>
                                <Button
                                    theme="primary"
                                    onClick={() =>
                                        onRemoveFromCart([product.id, false])
                                    }
                                >
                                    -
                                </Button>
                                <span className={cls.count}>{count}</span>
                                <Button
                                    theme="primary"
                                    onClick={() => onAddToCart(product)}
                                    disabled={
                                        count === product.quantity && "disabled"
                                    }
                                >
                                    +
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className={cls.infoWrapper}>
                        <div className={cls.info}>
                            <span className={cls.infoTitle}>
                                {getInfoTitle("Вес")}
                            </span>
                            <span className={cls.infoData}>
                                {product.weight} кг
                            </span>
                        </div>
                        <div className={cls.info}>
                            <span className={cls.infoTitle}>
                                {getInfoTitle("Магазин")}
                            </span>
                            <span className={cls.infoData}>
                                {product.store_name}
                            </span>
                        </div>
                        <div className={cls.info}>
                            <span className={cls.infoTitle}>
                                {getInfoTitle("Количество")}
                            </span>
                            <span className={cls.infoData}>
                                {product.quantity}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cls.description}>
                <p className={cls.descriptionTitle}>Описание: </p>
                {product.description}
            </div>
        </div>
    );
};
