import { authActions, logout } from "features/Auth";
import { getAuthIsAuth, getAuthType } from "features/Auth";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";

export default function Navbar() {
    const dispatch = useDispatch();
    const isAuth = useSelector(getAuthIsAuth);
    const type = useSelector(getAuthType);

    let links = null;

    const onLogout = useCallback(() => {
        dispatch(logout());
        // dispatch(clientActions.logout());
        // dispatch(courierActions.logout());
    }, [dispatch]);

    const onClickAuth = useCallback(
        (type) => {
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
                    to={"/market/auth"}
                    className={({ isActive }) =>
                        classNames(cls.link, { [cls.active]: isActive }, [])
                    }
                    onClick={() => onClickAuth("market")}
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
                        to={"/"}
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
                    <NavLink
                        onClick={onLogout}
                        to={"/auth"}
                        className={({ isActive }) =>
                            classNames(cls.link, { [cls.active]: isActive }, [])
                        }
                    >
                        Выйти
                    </NavLink>
                </>
            );
        } else if (type === "courier") {
            links = (
                <>
                    <NavLink
                        to={"/"}
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
                    <NavLink
                        onClick={onLogout}
                        to={"/auth"}
                        className={({ isActive }) =>
                            classNames(cls.link, { [cls.active]: isActive }, [])
                        }
                    >
                        Выйти
                    </NavLink>
                </>
            );
        } else if (type === "market") {
            links = (
                <>
                    <NavLink
                        to={"/"}
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
                    <NavLink
                        onClick={onLogout}
                        to={"/auth"}
                        className={({ isActive }) =>
                            classNames(cls.link, { [cls.active]: isActive }, [])
                        }
                    >
                        Выйти
                    </NavLink>
                </>
            );
        } else if (type === "admin") {
            links = (
                <>
                    <NavLink
                        to={"/"}
                        className={({ isActive }) =>
                            classNames(cls.link, { [cls.active]: isActive }, [])
                        }
                    >
                        Товары
                    </NavLink>
                    <NavLink
                        onClick={onLogout}
                        to={"/auth"}
                        className={({ isActive }) =>
                            classNames(cls.link, { [cls.active]: isActive }, [])
                        }
                    >
                        Выйти
                    </NavLink>
                </>
            );
        }
    }

    // TESTING
    links = (
        <>
            <NavLink
                to={"/"}
                className={({ isActive }) =>
                    classNames(cls.link, { [cls.active]: isActive }, [])
                }
            >
                Товары
            </NavLink>
            <NavLink
                onClick={onLogout}
                to={"/auth"}
                className={({ isActive }) =>
                    classNames(cls.link, { [cls.active]: isActive }, [])
                }
            >
                Выйти
            </NavLink>
        </>
    );

    return (
        <header className={classNames(cls.Navbar, {}, [])}>
            <span className={cls.title}> Slavic Market </span>
            <div className={cls.linksWrapper}>{links}</div>
        </header>
    );
}
