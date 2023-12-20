import React from "react";
import cls from "./Input.module.scss";
import { classNames } from "shared/lib/classNames/classNames";

export const Input = (props) => {
    const { className, onChange, label, value, autoFocus } = props;

    const onChangeHandler = (e) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            {label && <span className={cls.label}>{label}</span>}
            <input
                value={value}
                type="text"
                onChange={onChangeHandler}
                className={cls.input}
                autoFocus={autoFocus}
            />
        </div>
    );
};
