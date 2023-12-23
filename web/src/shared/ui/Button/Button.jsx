import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Button.module.scss";

export const Button = (props) => {
    const { className, children, onClick, theme } = props;

    return (
        <button
            onClick={onClick}
            className={classNames(cls.Button, {}, [className, cls[theme]])}
        >
            {children}
        </button>
    );
};
