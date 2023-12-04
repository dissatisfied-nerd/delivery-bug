import { clientActions } from "entities/Client";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import { validateNumber } from "shared/lib/validateNumber/validateNumber";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import {
    getAddAddressData,
    getAddAddressIsDisplay,
} from "../model/selectors/getAddAddressData";
import { addAddressActions } from "../model/slice/AddAddressSlice";
import cls from "./AddAddress.module.scss";

export const AddAddress = ({ className }) => {
    const dispatch = useDispatch();
    const data = useSelector(getAddAddressData);
    const { city, street, building, entrance, floor, aparts } = data;

    const visible = useSelector(getAddAddressIsDisplay);

    const onShowAddAddress = useCallback(() => {
        dispatch(addAddressActions.setIsDisplay(true));
    }, [dispatch]);

    const onAddAddress = useCallback(() => {
        console.log(data);
        dispatch(clientActions.addAddress(data));
        dispatch(addAddressActions.setIsDisplay(false));
        dispatch(addAddressActions.setDefaultData());
    }, [dispatch, data]);

    const onCancelAddAddress = useCallback(() => {
        dispatch(addAddressActions.setIsDisplay(false));
        dispatch(addAddressActions.setDefaultData());
    }, [dispatch]);

    const onChangeCity = useCallback(
        (city) => {
            dispatch(addAddressActions.setData({ city }));
        },
        [dispatch]
    );

    const onChangeStreet = useCallback(
        (street) => {
            dispatch(addAddressActions.setData({ street }));
        },
        [dispatch]
    );

    const onChangeBuilding = useCallback(
        (building) => {
            dispatch(
                addAddressActions.setData({
                    building: validateNumber(building),
                })
            );
        },
        [dispatch]
    );

    const onChangeEntrance = useCallback(
        (entrance) => {
            dispatch(
                addAddressActions.setData({
                    entrance: validateNumber(entrance),
                })
            );
        },
        [dispatch]
    );

    const onChangeFloor = useCallback(
        (floor) => {
            dispatch(
                addAddressActions.setData({ floor: validateNumber(floor) })
            );
        },
        [dispatch]
    );

    const onChangeAparts = useCallback(
        (aparts) => {
            dispatch(
                addAddressActions.setData({ aparts: validateNumber(aparts) })
            );
        },
        [dispatch]
    );

    return (
        <div className={classNames(cls.AddAddress, {}, [className])}>
            <div
                className={classNames(
                    cls.formWrapper,
                    { [cls.display]: visible },
                    []
                )}
            >
                <div className={cls.inputWrapper}>
                    <Input
                        label="Город"
                        onChange={onChangeCity}
                        value={city}
                    ></Input>
                    <Input
                        label="Улица"
                        onChange={onChangeStreet}
                        value={street}
                    ></Input>
                    <Input
                        label="Дом"
                        onChange={onChangeBuilding}
                        value={building}
                    ></Input>
                    <Input
                        label="Подъезд"
                        onChange={onChangeEntrance}
                        value={entrance}
                    ></Input>
                    <Input
                        label="Этаж"
                        onChange={onChangeFloor}
                        value={floor}
                    ></Input>
                    <Input
                        label="Квартира"
                        onChange={onChangeAparts}
                        value={aparts}
                    ></Input>
                </div>
                <div className={cls.btnWrapper}>
                    <Button theme="primary" onClick={onAddAddress}>
                        Добавить
                    </Button>
                    <Button
                        className={cls.cancelBtn}
                        onClick={onCancelAddAddress}
                    >
                        Отменить
                    </Button>
                </div>
            </div>
            <Button
                theme="primary"
                className={classNames(
                    cls.addAddressBtn,
                    { [cls.displayBtn]: !visible },
                    []
                )}
                onClick={onShowAddAddress}
            >
                Добавить адрес
            </Button>
        </div>
    );
};
