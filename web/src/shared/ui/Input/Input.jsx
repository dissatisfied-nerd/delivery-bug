import React from "react";
import cls from "./Input.module.scss";
import { classNames } from "shared/lib/classNames/classNames";

export const Input = (props) => {
    const { className, onChange, label, value, type = "text" } = props;

    const onChangeHandler = (e) => {
        if (type === "file") {
            onChange?.(e.target.files[0]);
        } else {
            onChange?.(e.target.value);
        }
    };

    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            {label && <span className={cls.label}>{label}</span>}
            <input
                value={value}
                type={type}
                onChange={onChangeHandler}
                className={classNames(cls.input, {}, [cls[type]])}
            />
        </div>
    );
};
