import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import cls from "./AuthForm.module.scss";
import { useNavigate } from "react-router-dom";
import { sendRegisterData } from "../model/services/sendRegisterData/sendRegisterData";
import {
    getAuthData,
    getAuthError,
    getAuthType,
} from "../model/selectors/getAuthData";
import { authActions } from "../model/slice/AuthSlice";
import { validateNumber } from "../model/services/validateForm/validateNumber";
import { sendLoginData } from "../model/services/sendLoginData/sendLoginData";

export const AuthForm = () => {
    const [formType, setFormType] = useState("signUp");
    const dispatch = useDispatch();
    const data = useSelector(getAuthData);
    const type = useSelector(getAuthType);
    const error = useSelector(getAuthError);
    const {
        first_name = "",
        last_name = "",
        login = "",
        city = "",
        building = "",
        street = "",
        floor = "",
        entrance = "",
        apartment = "",
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

    const onChangeLogin = useCallback(
        (data) => {
            dispatch(authActions.setLogin(data));
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
            dispatch(authActions.setBuilding(validateNumber(data)));
        },
        [dispatch]
    );

    const onChangeEntrance = useCallback(
        (data) => {
            dispatch(authActions.setEntrance(validateNumber(data)));
        },
        [dispatch]
    );

    const onChangeFloor = useCallback(
        (data) => {
            dispatch(authActions.setFloor(validateNumber(data)));
        },
        [dispatch]
    );

    const onChangeAparts = useCallback(
        (data) => {
            dispatch(authActions.setAparts(validateNumber(data)));
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
        navigate("/", { replace: true });
        window.scrollTo(0, 0);
    }, [navigate]);

    const onSignUp = useCallback(async () => {
        const result = await dispatch(sendRegisterData(data));
        if (!result.meta.rejectedWithValue) {
            onSuccess();
        }
    }, [onSuccess, data, dispatch]);

    const onLogin = useCallback(async () => {
        const result = await dispatch(sendLoginData({ login, password }));
        if (!result.meta.rejectedWithValue) {
            onSuccess();
        }
    }, [onSuccess, login, password, dispatch]);

    if (formType === "signUp") {
        return (
            <div className={classNames(cls.AuthForm, {}, [])}>
                <span className={cls.title}>Регистрация</span>
                <span style={{ color: "red" }}>{error}</span>
                <Input
                    className={cls.input}
                    label="Имя"
                    value={first_name}
                    onChange={onChangeFirstName}
                    autoFocus
                />
                <Input
                    className={cls.input}
                    label="Фамилия"
                    value={last_name}
                    onChange={onChangeLastName}
                    autoFocus
                />
                <Input
                    className={cls.input}
                    label="Почта"
                    value={login}
                    onChange={onChangeLogin}
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
                    value={apartment}
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
                <Button theme="primary" onClick={onSignUp}>
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
                    value={login}
                    onChange={onChangeLogin}
                    autoFocus
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
                <Button theme="primary" onClick={onLogin}>
                    Войти
                </Button>
                <Button className={cls.changeForm} onClick={onChangeForm}>
                    ЭЭЭ бля я не смешарик еще
                </Button>
            </div>
        );
    }
};
