import { OrderList } from "entities/Order";
import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Card } from "shared/ui/Card/Card";
import cls from "./ProfileCard.module.scss";

export const ProfileCard = (props) => {
    const { className, profile, orders } = props;
    return (
        <div className={cls.ProfileCard}>
            <span className={cls.pageTitle}> Профиль </span>
            <div className={cls.header}>
                <span className={cls.name}>{profile.last_name}</span>
                <span className={cls.name}>{profile.first_name}</span>
                <span>Баланс: {profile.balance} ₽</span>
            </div>
            <div className={cls.line}></div>
            <div className={cls.adressWrapper}>
                <div className={cls.title}>Адрес</div>
                <div className={cls.adress}>
                    <span>Город: {profile.city}</span>
                    <span>Улица: {profile.street}</span>
                    <span>Дом: {profile.building}</span>
                    <span>Подъезд: {profile.entrance}</span>
                    <span>Этаж: {profile.floor}</span>
                    <span>Квартира: {profile.apartment}</span>
                </div>
            </div>
            <div className={cls.line}></div>
        </div>
    );
};
