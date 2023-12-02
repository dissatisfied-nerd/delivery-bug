import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import cls from "./AuthForm.module.scss";
import { useNavigate } from "react-router-dom";
import { sendRegisterData } from "../model/services/sendRegisterData";
import { getAuthData, getAuthType } from "../model/selectors/getAuthData";
import { authActions } from "../model/slice/AuthSlice";

export const AuthForm = () => {
    const [formType, setFormType] = useState("signUp");
    const dispatch = useDispatch();
    const data = useSelector(getAuthData);
    const type = useSelector(getAuthType);
    const {
        firstName = "",
        lastName = "",
        email = "",
        city = "",
        building = "",
        street = "",
        floor = "",
        entrance = "",
        aparts = "",
        password = "",
    } = data;
    const navigate = useNavigate();

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
            dispatch(authActions.setFirstName(data));
        },
        [dispatch]
    );

    const onChangeLastName = useCallback(
        (data) => {
            dispatch(authActions.setLastName(data));
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
            dispatch(
                authActions.setBuilding(Number(data?.replace(/\D/gm, "")))
            );
        },
        [dispatch]
    );

    const onChangeEntrance = useCallback(
        (data) => {
            dispatch(
                authActions.setEntrance(Number(data?.replace(/\D/gm, "")))
            );
        },
        [dispatch]
    );

    const onChangeFloor = useCallback(
        (data) => {
            dispatch(authActions.setFloor(Number(data?.replace(/\D/gm, ""))));
        },
        [dispatch]
    );

    const onChangeAparts = useCallback(
        (data) => {
            dispatch(authActions.setAparts(Number(data?.replace(/\D/gm, ""))));
        },
        [dispatch]
    );

    const onChangePassword = useCallback(
        (data) => {
            dispatch(authActions.setPassword(data));
        },
        [dispatch]
    );

    const onChangeType = useCallback(
        (data) => {
            dispatch(authActions.setType(data.target.value));
        },
        [dispatch]
    );

    const onSuccess = useCallback(() => {
        dispatch(authActions.setIsAuth(true));
        dispatch(authActions.saveAuthData());
        navigate("/", { replace: true });
        window.scrollTo(0, 0);
    }, [dispatch, navigate]);

    const onSignUp = useCallback(() => {
        dispatch(sendRegisterData(data));
        onSuccess();
    }, [onSuccess, data, dispatch]);

    const onLogin = useCallback(() => {
        onSuccess();
    }, [onSuccess]);

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
                <Button className={cls.sendBtn} onClick={onSignUp}>
                    Зарегистрироваться
                </Button>
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
                <Button className={cls.sendBtn} onClick={onLogin}>
                    Войти
                </Button>
                <Button className={cls.changeForm} onClick={onChangeForm}>
                    ЭЭЭ бля я не смешарик еще
                </Button>
            </div>
        );
    }
};
