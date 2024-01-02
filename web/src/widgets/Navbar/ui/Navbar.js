import { authActions, logout } from "features/Auth";
import { getAuthIsAuth, getAuthType } from "features/Auth";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui/Button/Button";
import cls from "./Navbar.module.scss";

export function Navbar() {
    const dispatch = useDispatch();
    const isAuth = useSelector(getAuthIsAuth);
    const type = useSelector(getAuthType);

    let links = null;

    const onLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    const onClickAuth = useCallback(
        (type) => {
            dispatch(authActions.emptyError());
            dispatch(authActions.setType(type));
            dispatch(authActions.saveAuthData({ type }));
        },
        [dispatch]
    );

    if (!isAuth) {
        links = (
            <>
                <NavLink
                    to={"/auth"}
                    className={({ isActive }) =>
                        classNames(cls.link, { [cls.active]: isActive }, [])
                    }
                    onClick={() => onClickAuth("client")}
                >
                    Авторизация
                </NavLink>
                <NavLink
                    to={"/store/auth"}
                    className={({ isActive }) =>
                        classNames(cls.link, { [cls.active]: isActive }, [])
                    }
                    onClick={() => onClickAuth("store")}
                >
                    Для поставщиков
                </NavLink>
                <NavLink
                    to={"/admin/auth"}
                    className={({ isActive }) =>
                        classNames(cls.link, { [cls.active]: isActive }, [])
                    }
                    onClick={() => onClickAuth("admin")}
                >
                    Для администратора
                </NavLink>
            </>
        );
    } else {
        if (type === "client") {
            links = (
                <>
                    <NavLink
                        to={"/products"}
                        className={({ isActive }) =>
                            classNames(cls.link, { [cls.active]: isActive }, [])
                        }
                    >
                        Товары
                    </NavLink>
                    <NavLink
                        to={"/cart"}
                        className={({ isActive }) =>
                            classNames(cls.link, { [cls.active]: isActive }, [])
                        }
                    >
                        Корзина
                    </NavLink>
                    <NavLink
                        to={"/profile"}
                        className={({ isActive }) =>
                            classNames(cls.link, { [cls.active]: isActive }, [])
                        }
                    >
                        Профиль
                    </NavLink>
                    <Button
                        onClick={onLogout}
                        className={classNames(cls.link, {}, [cls.logoutBtn])}
                    >
                        Выйти
                    </Button>
                </>
            );
        } else if (type === "courier") {
            links = (
                <>
                    <NavLink
                        to={"/orders"}
                        className={({ isActive }) =>
                            classNames(cls.link, { [cls.active]: isActive }, [])
                        }
                    >
                        Заказы
                    </NavLink>
                    <NavLink
                        to={"/profile"}
                        className={({ isActive }) =>
                            classNames(cls.link, { [cls.active]: isActive }, [])
                        }
                    >
                        Профиль
                    </NavLink>
                    <Button
                        onClick={onLogout}
                        className={classNames(cls.link, {}, [cls.logoutBtn])}
                    >
                        Выйти
                    </Button>
                </>
            );
        } else if (type === "store") {
            links = (
                <>
                    <NavLink
                        to={"/create-product"}
                        className={({ isActive }) =>
                            classNames(cls.link, { [cls.active]: isActive }, [])
                        }
                    >
                        Создать товар
                    </NavLink>
                    <NavLink
                        to={"/profile"}
                        className={({ isActive }) =>
                            classNames(cls.link, { [cls.active]: isActive }, [])
                        }
                    >
                        Профиль
                    </NavLink>
                    <Button
                        onClick={onLogout}
                        className={classNames(cls.link, {}, [cls.logoutBtn])}
                    >
                        Выйти
                    </Button>
                </>
            );
        } else if (type === "admin") {
            links = (
                <>
                    <NavLink
                        to={"/delete-product"}
                        className={({ isActive }) =>
                            classNames(cls.link, { [cls.active]: isActive }, [])
                        }
                    >
                        Товары
                    </NavLink>
                    <Button
                        onClick={onLogout}
                        className={classNames(cls.link, {}, [cls.logoutBtn])}
                    >
                        Выйти
                    </Button>
                </>
            );
        }
    }

    return (
        <header className={classNames(cls.Navbar, {}, [])}>
            <span className={cls.title}> Slavic Store </span>
            <div className={cls.linksWrapper}>{links}</div>
        </header>
    );
}
