import { OrderList } from "entities/Order";
import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Card } from "shared/ui/Card/Card";
import { Loader } from "shared/ui/Loader/Loader";
import cls from "./ProfileCard.module.scss";

export const ProfileCard = (props) => {
    const { className, profile, error, type, isLoading } = props;
    console.log(profile);

    if (isLoading) {
        return (
            <div className={cls.ProfileCard}>
                <Loader />
            </div>
        );
    }
    return (
        <div className={cls.ProfileCard}>
            <div className={cls.error}>{error}</div>
            <div className={cls.header}>
                {type === "store" && (
                    <span className={cls.name}>{profile.name}</span>
                )}
                <span className={cls.name}>{profile.last_name}</span>
                <span className={cls.name}>{profile.first_name}</span>
                {type === "client" && <span>Баланс: {profile.balance} ₽</span>}
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
