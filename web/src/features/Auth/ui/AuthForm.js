import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import {
    getProfileAparts,
    getProfileBuilding,
    getProfileCity,
    getProfileEmail,
    getProfileEntrance,
    getProfileFloor,
    getProfilePassword,
    getProfileStreet,
    getProfileFirstName,
    getProfileLastName,
    getProfileType,
} from "entities/Profile";
import { profileActions } from "entities/Profile";
import cls from "./AuthForm.module.scss";

export const AuthForm = () => {
    const [formType, setFormType] = useState("signUp");
    const dispatch = useDispatch();
    const firstName = useSelector(getProfileFirstName);
    const lastName = useSelector(getProfileLastName);
    const email = useSelector(getProfileEmail);
    const city = useSelector(getProfileCity);
    const building = useSelector(getProfileBuilding);
    const street = useSelector(getProfileStreet);
    const floor = useSelector(getProfileFloor);
    const entrance = useSelector(getProfileEntrance);
    const aparts = useSelector(getProfileAparts);
    const password = useSelector(getProfilePassword);
    const type = useSelector(getProfileType);

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

    const onChangeFirstName = useCallback(
        (data) => {
            dispatch(profileActions.setFirstName(data));
        },
        [dispatch]
    );

    const onChangeLastName = useCallback(
        (data) => {
            dispatch(profileActions.setLastName(data));
        },
        [dispatch]
    );

    const onChangeEmail = useCallback(
        (data) => {
            dispatch(profileActions.setEmail(data));
        },
        [dispatch]
    );

    const onChangeCity = useCallback(
        (data) => {
            dispatch(profileActions.setCity(data));
        },
        [dispatch]
    );

    const onChangeStreet = useCallback(
        (data) => {
            dispatch(profileActions.setStreet(data));
        },
        [dispatch]
    );

    const onChangeBuilding = useCallback(
        (data) => {
            dispatch(profileActions.setBuilding(data));
        },
        [dispatch]
    );

    const onChangeEntrance = useCallback(
        (data) => {
            dispatch(profileActions.setEntrance(data));
        },
        [dispatch]
    );

    const onChangeFloor = useCallback(
        (data) => {
            dispatch(profileActions.setFloor(data));
        },
        [dispatch]
    );

    const onChangeAparts = useCallback(
        (data) => {
            dispatch(profileActions.setAparts(data));
        },
        [dispatch]
    );

    const onChangePassword = useCallback(
        (data) => {
            dispatch(profileActions.setPassword(data));
        },
        [dispatch]
    );

    const onChangeType = useCallback(
        (data) => {
            dispatch(profileActions.setType(data.target.value));
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
                    value={firstName}
                    onChange={onChangeFirstName}
                    autoFocus
                />
                <Input
                    className={cls.input}
                    label="Фамилия"
                    value={lastName}
                    onChange={onChangeLastName}
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
                <select
                    className={cls.input}
                    onChange={onChangeType}
                    value={type}
                >
                    <option value="client" key="client">
                        Пользователь
                    </option>
                    <option value="courier" key="courier">
                        Курьер
                    </option>
                </select>
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
