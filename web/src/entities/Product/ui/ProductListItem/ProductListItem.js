import React, { useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui/Button/Button";
import { Card } from "shared/ui/Card/Card";
import cls from "./ProductListItem.module.scss";

export const ProductListItem = (props) => {
    const {
        className,
        product,
        onAddToCart,
        onRemoveFromCart,
        count,
        type = "small",
        isAdmin = false,
        onDeleteProduct,
    } = props;

    if (type === "small") {
        return (
            <Card className={classNames(cls.ProductListItem, {}, [className])}>
                <div className={cls.imgWrapper}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className={cls.img}
                    />
                </div>
                <div className={cls.textWrapper}>
                    <span className={classNames(cls.price, {}, [cls.bold])}>
                        {product.price} ₽
                    </span>
                    <span className={cls.title}>{product.name}</span>
                </div>
                {!count ? (
                    <Button
                        theme="primary"
                        onClick={() => onAddToCart(product)}
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
                        >
                            +
                        </Button>
                    </div>
                )}
            </Card>
        );
    } else {
        return (
            <Card
                className={classNames(cls.ProductListItem, {}, [
                    className,
                    cls.big,
                ])}
            >
                <div className={cls.imgWrapper}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className={cls.img}
                    />
                </div>
                <div className={cls.textWrapper}>
                    {isAdmin && (
                        <Button
                            onClick={onDeleteProduct}
                            className={cls.onDeleteBtn}
                            theme="danger"
                        >
                            Удалить
                        </Button>
                    )}
                    <span>
                        <span className={cls.bold}> Название </span>{" "}
                        {product.name}
                    </span>
                    <span>
                        <span className={cls.bold}>Цена </span> {product.price}{" "}
                        ₽
                    </span>
                    <span>
                        <span className={cls.bold}>Вес </span> {product.weight}{" "}
                        кг
                    </span>
                    <span>
                        <span className={cls.bold}>Описание </span>
                        <p className={cls.description}>{product.description}</p>
                    </span>
                </div>
            </Card>
        );
    }
};
