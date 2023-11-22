import React, { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Page.module.scss";

export const Page = memo(({ className, children }) => {
    return (
        <main className={classNames(cls.Page, {}, [className])}>
            {children}
        </main>
    );
});
