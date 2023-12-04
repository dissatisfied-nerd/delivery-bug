import { OrderList } from "entities/Order";
import {
    AddAddress,
    addAddressActions,
    getAddAddressIsDisplay,
} from "features/AddAddress";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "shared/ui/Button/Button";
import { Card } from "shared/ui/Card/Card";
import cls from "./ProfileCard.module.scss";

export const ProfileCard = (props) => {
    const { className, profile, type, orders } = props;
    console.log(profile);

    return (
        <div className={cls.ProfileCard}>
            <span className={cls.pageTitle}> Профиль </span>
            <div className={cls.header}>
                <span className={cls.name}>{profile.lastName}</span>
                <span className={cls.name}>{profile.firstName}</span>
                <span>Баланс: {profile.balance} ₽</span>
            </div>
            <div className={cls.line}></div>
            {type === "courier" ? (
                <div className={cls.addressWrapper}>
                    <div className={cls.title}>Адрес</div>
                    <div className={cls.address}>
                        <span className={cls.addressItem}>
                            Город: {profile.city}
                        </span>
                        <span className={cls.addressItem}>
                            Улица: {profile.street}
                        </span>
                        <span
                            className={classNames(cls.addressItem, {}, [
                                cls.addressItemNumber,
                            ])}
                        >
                            Дом: {profile.building}
                        </span>
                        <span
                            className={classNames(cls.addressItem, {}, [
                                cls.addressItemNumber,
                            ])}
                        >
                            Подъезд: {profile.entrance}
                        </span>
                        <span
                            className={classNames(cls.addressItem, {}, [
                                cls.addressItemNumber,
                            ])}
                        >
                            Этаж: {profile.floor}
                        </span>
                        <span
                            className={classNames(cls.addressItem, {}, [
                                cls.addressItemNumber,
                            ])}
                        >
                            Квартира: {profile.aparts}
                        </span>
                    </div>
                </div>
            ) : (
                <div className={cls.addressWrapper}>
                    <div className={cls.title}>Адрес</div>
                    {profile.address.map((adress, ind) => (
                        <div className={cls.address} key={ind}>
                            <span className={cls.addressItem}>
                                Город: {adress.city}
                            </span>
                            <span className={cls.addressItem}>
                                Улица: {adress.street}
                            </span>
                            <span
                                className={classNames(cls.addressItem, {}, [
                                    cls.addressItemNumber,
                                ])}
                            >
                                Дом: {adress.building}
                            </span>
                            <span
                                className={classNames(cls.addressItem, {}, [
                                    cls.addressItemNumber,
                                ])}
                            >
                                Подъезд: {adress.entrance}
                            </span>
                            <span
                                className={classNames(cls.addressItem, {}, [
                                    cls.addressItemNumber,
                                ])}
                            >
                                Этаж: {adress.floor}
                            </span>
                            <span
                                className={classNames(cls.addressItem, {}, [
                                    cls.addressItemNumber,
                                ])}
                            >
                                Квартира: {adress.aparts}
                            </span>
                        </div>
                    ))}
                    <AddAddress className={cls.addAddress} />
                </div>
            )}
            <div className={cls.line}></div>
        </div>
    );
};
