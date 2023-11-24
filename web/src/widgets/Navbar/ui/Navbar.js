import React from "react";
import { Link } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";

export default function Navbar() {
    return (
        <header className={classNames(cls.Navbar, {}, [])}>
            <span className={cls.title}> Slavic Market </span>
            <div className={cls.linksWrapper}>
                <Link to={"/"} className={cls.link}>
                    Авторизация
                </Link>
                <Link to={"/goods"} className={cls.link}>
                    Товары
                </Link>
                <Link to={"/profile"} className={cls.link}>
                    Профиль
                </Link>
            </div>
        </header>
    );
}
