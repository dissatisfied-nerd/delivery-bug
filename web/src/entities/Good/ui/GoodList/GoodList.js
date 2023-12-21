import React, { memo } from "react";
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
    } = props;

    if (type === "small") {
        return (
            <div
                className={classNames(
                    cls.GoodList,
                    { [cls.empty]: !goods.length },
                    [className]
                )}
            >
                {!goods.length && <span>Товаров нет</span>}
                {goods.map((good) => {
                    return (
                        <GoodListItem
                            key={good.id}
                            good={good}
                            onAddToCart={onAddToCart}
                            onRemoveFromCart={onRemoveFromCart}
                            count={cart[good.id]?.[1] || 0}
                        />
                    );
                })}
            </div>
        );
    } else {
        return (
            <div
                className={classNames(
                    cls.GoodList,
                    { [cls.empty]: !goods.length },
                    [className, cls.big]
                )}
            >
                {!goods.length && (
                    <div className={cls.message}>Товаров нет</div>
                )}
                {goods.map((good) => {
                    return (
                        <GoodListItem key={good.id} good={good} type={type} />
                    );
                })}
            </div>
        );
    }
});
