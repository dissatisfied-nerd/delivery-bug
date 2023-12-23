import React, { memo, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { GoodListItem } from "../GoodListItem/GoodListItem";
import cls from "./GoodList.module.scss";

export const GoodList = memo((props) => {
    const {
        className,
        goods,
        onAddToCart,
        onRemoveFromCart,
        cart,
        type = "small",
        isAdmin = false,
        onDeleteGood,
    } = props;

    let content;

    if (type === "small") {
        content = goods.map((good) => {
            return (
                <GoodListItem
                    key={good.id}
                    good={good}
                    onAddToCart={onAddToCart}
                    onRemoveFromCart={onRemoveFromCart}
                    count={cart[good.id]?.[1] || 0}
                />
            );
        });
    } else {
        content = goods.map((good) => {
            return (
                <GoodListItem
                    key={good.id}
                    good={good}
                    type={type}
                    isAdmin={isAdmin}
                    onDeleteGood={() => onDeleteGood(good.id)}
                />
            );
        });
    }

    return (
        <div
            className={classNames(
                cls.GoodList,
                { [cls.empty]: !goods.length },
                [className, cls[type]]
            )}
        >
            {!goods.length && <span>Товаров нет</span>}
            {content}
        </div>
    );
});
