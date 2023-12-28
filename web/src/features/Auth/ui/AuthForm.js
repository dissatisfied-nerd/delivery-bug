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
    getAuthIsLoading,
    getAuthType,
} from "../model/selectors/getAuthData";
import { authActions } from "../model/slice/AuthSlice";
import { validateNumber } from "../../../shared/lib/validateForm/validateNumber";
import { sendLoginData } from "../model/services/sendLoginData/sendLoginData";

export const AuthForm = () => {
    const [formType, setFormType] = useState("signUp");
    const dispatch = useDispatch();
    const data = useSelector(getAuthData);
    const type = useSelector(getAuthType);
    const error = useSelector(getAuthError);
    const isLoading = useSelector(getAuthIsLoading);
    const {
        name = "",
        first_name = "",
        last_name = "",
        middle_name = "",
        login = "",
        city = "",
        building = "",
        street = "",
        floor = "",
        entrance = "",
        apartment = "",
        password = "",
        passphrase = "",
    } = data;
    const navigate = useNavigate();

    useEffect(() => {
        const firstInput = [
            ...document.getElementsByClassName(cls.input),
        ].filter((el) => el.lastChild.value === "")[0]?.lastChild;
        firstInput?.focus();
    }, [type, formType]);

    const onChangeForm = useCallback(() => {
        dispatch(authActions.emptyError());
        setFormType(formType === "signUp" ? "logIn" : "signUp");
    }, [formType, dispatch]);

    const onChangeStoreName = useCallback(
        (data) => {
            dispatch(authActions.changeData({ name: data }));
        },
        [dispatch]
    );

    const onChangeFirstName = useCallback(
        (data) => {
            dispatch(authActions.changeData({ first_name: data }));
        },
        [dispatch]
    );

    const onChangeLastName = useCallback(
        (data) => {
            dispatch(authActions.changeData({ last_name: data }));
        },
        [dispatch]
    );

    const onChangeFatherName = useCallback(
        (data) => {
            dispatch(authActions.changeData({ middle_name: data }));
        },
        [dispatch]
    );

    const onChangeLogin = useCallback(
        (data) => {
            dispatch(authActions.changeData({ login: data }));
        },
        [dispatch]
    );

    const onChangeCity = useCallback(
        (data) => {
            dispatch(authActions.changeData({ city: data }));
        },
        [dispatch]
    );

    const onChangeStreet = useCallback(
        (data) => {
            dispatch(authActions.changeData({ street: data }));
        },
        [dispatch]
    );

    const onChangeBuilding = useCallback(
        (data) => {
            dispatch(
                authActions.changeData({ building: validateNumber(data) })
            );
        },
        [dispatch]
    );

    const onChangeEntrance = useCallback(
        (data) => {
            dispatch(
                authActions.changeData({ entrance: validateNumber(data) })
            );
        },
        [dispatch]
    );

    const onChangeFloor = useCallback(
        (data) => {
            dispatch(authActions.changeData({ floor: validateNumber(data) }));
        },
        [dispatch]
    );

    const onChangeAparts = useCallback(
        (data) => {
            dispatch(
                authActions.changeData({ apartment: validateNumber(data) })
            );
        },
        [dispatch]
    );

    const onChangePassword = useCallback(
        (data) => {
            dispatch(authActions.changeData({ password: data }));
        },
        [dispatch]
    );

    const onChangeSecretWord = useCallback(
        (data) => {
            dispatch(authActions.changeData({ passphrase: data }));
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
        let signUpData;
        if (type === "client" || type === "courier") {
            const { name, middle_name, passphrase, ...restData } = data;
            signUpData = restData;
        } else if (type === "store") {
            const { passphrase, ...restData } = data;
            signUpData = restData;
        } else {
            signUpData = {
                first_name,
                last_name,
                middle_name,
                login,
                password,
                passphrase,
            };
        }
        const result = await dispatch(sendRegisterData(signUpData));
        if (!result.meta.rejectedWithValue) {
            onSuccess();
        }
    }, [onSuccess, data, dispatch]);

    const onLogin = useCallback(async () => {
        const loginData =
            type === "admin" ? { login, password } : { login, password };
        const result = await dispatch(sendLoginData(loginData));
        if (!result.meta.rejectedWithValue) {
            onSuccess();
        }
    }, [onSuccess, login, password, dispatch]);

    const signUpInputs =
        type === "client" || type === "courier" ? (
            <>
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
            </>
        ) : type === "store" ? (
            <>
                <Input
                    className={cls.input}
                    label="Название магазина"
                    value={name}
                    onChange={onChangeStoreName}
                    autoFocus
                />
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
                    label="Отчество"
                    value={middle_name}
                    onChange={onChangeFatherName}
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
            </>
        ) : (
            <>
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
                    label="Отчество"
                    value={middle_name}
                    onChange={onChangeFatherName}
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
                    onChange={onChangePassword}
                    label="Пароль"
                    value={password}
                />
                <Input
                    className={cls.input}
                    onChange={onChangeSecretWord}
                    label="Кодовое слово"
                    value={passphrase}
                />
            </>
        );

    if (formType === "signUp") {
        return (
            <div className={classNames(cls.AuthForm, {}, [])}>
                <span className={cls.title}>Регистрация</span>

                {signUpInputs}
                {(type === "client" || type === "courier") && (
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
                )}
                <Button
                    theme="primary"
                    onClick={onSignUp}
                    disabled={isLoading && "disabled"}
                >
                    Зарегистрироваться
                </Button>
                <div className={cls.error}>{error}</div>
                <Button
                    className={cls.changeForm}
                    onClick={onChangeForm}
                    disabled={isLoading && "disabled"}
                >
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
                {(type === "client" || type === "courier") && (
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
                )}

                <Button
                    theme="primary"
                    onClick={onLogin}
                    disabled={isLoading && "disabled"}
                >
                    Войти
                </Button>
                <div className={cls.error}>{error}</div>
                <Button
                    className={cls.changeForm}
                    onClick={onChangeForm}
                    disabled={isLoading && "disabled"}
                >
                    Я еще не смешарик
                </Button>
            </div>
        );
    }
};
