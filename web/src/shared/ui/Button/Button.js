import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Button.module.scss";

export const Button = (props) => {
    const { className, children, onClick, theme, disabled = "" } = props;

    return (
        <button
            onClick={onClick}
            className={classNames(cls.Button, { [cls.disabled]: disabled }, [
                className,
                cls[theme],
            ])}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
