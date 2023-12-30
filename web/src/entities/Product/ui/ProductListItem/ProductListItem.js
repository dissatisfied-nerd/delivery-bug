import React, { useCallback } from "react";
import { Link } from "react-router-dom";
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

    const onPreventDefaultLink = useCallback((e) => {
        if (e.target?.tagName === "BUTTON") {
            e.preventDefault();
        }
    }, []);

    if (type === "small") {
        return (
            <Link
                to={"/product/" + product.id}
                onClick={onPreventDefaultLink}
                className={classNames(cls.ProductListItem, {}, [className])}
            >
                <Card
                    className={classNames(cls.ProductListItemCard, {}, [
                        className,
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
                        <span className={classNames(cls.price, {}, [cls.bold])}>
                            {product.price.toLocaleString("ru")} ₽
                        </span>
                        <span className={cls.title}>{product.name}</span>
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
                </Card>
            </Link>
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
                    <div>
                        <span className={cls.bold}> Название </span>
                        {product.name}
                    </div>
                    {isAdmin && (
                        <div>
                            <span className={cls.bold}>Магазин </span>
                            {product.store_name}
                        </div>
                    )}
                    <div>
                        <span className={cls.bold}>Количество </span>
                        {product.quantity}
                    </div>
                    <div>
                        <span className={cls.bold}>Цена </span>
                        {product.price.toLocaleString("ru")} ₽
                    </div>
                    <div>
                        <span className={cls.bold}>Вес </span> {product.weight}
                        кг
                    </div>
                    <div>
                        <span className={cls.bold}>Описание </span>
                        <p className={cls.description}>{product.description}</p>
                    </div>
                </div>
            </Card>
        );
    }
};
