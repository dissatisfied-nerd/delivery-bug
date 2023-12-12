import { clientActions } from "entities/Client";
import { authActions, logout } from "features/Auth";
import { getAuthIsAuth, getAuthType } from "features/Auth";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams, useSearchParams } from "react-router-dom";
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

    if (!isAuth) {
        links = (
            <NavLink
                to={"/auth"}
                className={({ isActive }) =>
                    classNames(cls.link, { [cls.active]: isActive }, [])
                }
            >
                Авторизация
            </NavLink>
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
                        // className={classNames(
                        //     cls.link,
                        //     {
                        //         [cls.active]: curLink.current === "goods",
                        //     },
                        //     []
                        // )}
                        // onClick={() => onSelectLink("goods")}
                    >
                        Товары
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
                        to={"/cart"}
                        className={({ isActive }) =>
                            classNames(cls.link, { [cls.active]: isActive }, [])
                        }
                    >
                        Корзина
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
        } else {
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
        }
    }
    return (
        <header className={classNames(cls.Navbar, {}, [])}>
            <span className={cls.title}> Slavic Market </span>
            <div className={cls.linksWrapper}>{links}</div>
        </header>
    );
}
