import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import {
    getAuthAparts,
    getAuthBuilding,
    getAuthCity,
    getAuthEmail,
    getAuthEntrance,
    getAuthFloor,
    getAuthPassword,
    getAuthStreet,
    getAuthUsername,
} from "../model/selectors/getAuthData";
import { authActions } from "../model/slice/AuthSlice";
import cls from "./AuthForm.module.scss";

export const AuthForm = () => {
    const [formType, setFormType] = useState("signUp");
    const dispatch = useDispatch();
    const username = useSelector(getAuthUsername);
    const email = useSelector(getAuthEmail);
    const city = useSelector(getAuthCity);
    const building = useSelector(getAuthBuilding);
    const street = useSelector(getAuthStreet);
    const floor = useSelector(getAuthFloor);
    const entrance = useSelector(getAuthEntrance);
    const aparts = useSelector(getAuthAparts);
    const password = useSelector(getAuthPassword);

    useEffect(() => {
        const firstInput = [
            ...document.getElementsByClassName(cls.input),
        ].filter((el) => el.lastChild.value === "")[0]?.lastChild;
        firstInput?.focus();
    }, [formType]);

    const onChangeForm = useCallback(
        () => setFormType(formType === "signUp" ? "logIn" : "signUp"),
        [formType]
    );

    const onChangeUsername = useCallback(
        (data) => {
            dispatch(authActions.setUsername(data));
        },
        [dispatch]
    );

    const onChangeEmail = useCallback(
        (data) => {
            dispatch(authActions.setEmail(data));
        },
        [dispatch]
    );

    const onChangeCity = useCallback(
        (data) => {
            dispatch(authActions.setCity(data));
        },
        [dispatch]
    );

    const onChangeStreet = useCallback(
        (data) => {
            dispatch(authActions.setStreet(data));
        },
        [dispatch]
    );

    const onChangeBuilding = useCallback(
        (data) => {
            dispatch(authActions.setBuilding(data));
        },
        [dispatch]
    );

    const onChangeEntrance = useCallback(
        (data) => {
            dispatch(authActions.setEntrance(data));
        },
        [dispatch]
    );

    const onChangeFloor = useCallback(
        (data) => {
            dispatch(authActions.setFloor(data));
        },
        [dispatch]
    );

    const onChangeAparts = useCallback(
        (data) => {
            dispatch(authActions.setAparts(data));
        },
        [dispatch]
    );

    const onChangePassword = useCallback(
        (data) => {
            dispatch(authActions.setPassword(data));
        },
        [dispatch]
    );

    if (formType === "signUp") {
        return (
            <div className={classNames(cls.AuthForm, {}, [])}>
                <span className={cls.title}>Регистрация</span>
                <Input
                    className={cls.input}
                    label="Имя"
                    value={username}
                    onChange={onChangeUsername}
                    autoFocus
                />
                <Input
                    className={cls.input}
                    label="Почта"
                    value={email}
                    onChange={onChangeEmail}
                />
                <Input
                    className={cls.input}
                    onChange={onChangeCity}
                    label="Город"
                    value={city}
                />
                <Input
                    className={cls.input}
                    onChange={onChangeStreet}
                    label="Улица"
                    value={street}
                />
                <Input
                    className={cls.input}
                    onChange={onChangeBuilding}
                    label="Дом"
                    value={building}
                />
                <Input
                    className={cls.input}
                    onChange={onChangeEntrance}
                    label="Подъезд"
                    value={entrance}
                />
                <Input
                    className={cls.input}
                    onChange={onChangeFloor}
                    label="Этаж"
                    value={floor}
                />
                <Input
                    className={cls.input}
                    onChange={onChangeAparts}
                    label="Квартира"
                    value={aparts}
                />
                <Input
                    className={cls.input}
                    onChange={onChangePassword}
                    label="Пароль"
                    value={password}
                />
                <Button className={cls.sendBtn}>Зарегистрироваться</Button>
                <Button className={cls.changeForm} onClick={onChangeForm}>
                    Я уже смешарик
                </Button>
            </div>
        );
    } else {
        return (
            <div className={classNames(cls.AuthForm, {}, [])}>
                <span className={cls.title}>Вход</span>
                <Input
                    className={cls.input}
                    label="Почта"
                    value={email}
                    onChange={onChangeEmail}
                    autoFocus
                />
                <Input
                    className={cls.input}
                    onChange={onChangePassword}
                    label="Пароль"
                    value={password}
                />
                <Button className={cls.sendBtn}>Войти</Button>
                <Button className={cls.changeForm} onClick={onChangeForm}>
                    ЭЭЭ бля я не смешарик еще
                </Button>
            </div>
        );
    }
};
