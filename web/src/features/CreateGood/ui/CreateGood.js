import React, { useCallback, useEffect, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./CreateGood.module.scss";
import { Input } from "shared/ui/Input/Input";
import { TextArea } from "shared/ui/TextArea/TextArea";
import { useDispatch, useSelector } from "react-redux";
import {
    getCreateGoodData,
    getCreateGoodError,
} from "../model/selectors/getCreateGoodData";
import { createGoodActions } from "../model/slice/createGoodSlice";
import { validateFloat } from "shared/lib/validateForm/validateFloat";
import { Button } from "shared/ui/Button/Button";
import { sendCreateGoodData } from "../model/services/sendCreateGoodData";

export const CreateGood = ({ className }) => {
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const data = useSelector(getCreateGoodData);
    const { name = "", price = "", weight = "", description = "" } = data;
    const error = useSelector(getCreateGoodError);

    useEffect(() => {
        const firstInput = [
            ...document.getElementsByClassName(cls.input),
        ].filter((el) => el.lastChild.value === "")[0]?.lastChild;
        firstInput?.focus();
    }, []);

    const onChangeName = useCallback(
        (name) => {
            dispatch(createGoodActions.changeData({ name }));
        },
        [dispatch]
    );

    const onChangePrice = useCallback(
        (price) => {
            dispatch(
                createGoodActions.changeData({
                    price: validateFloat(price),
                })
            );
        },
        [dispatch]
    );

    const onChangeWeight = useCallback(
        (weight) => {
            dispatch(
                createGoodActions.changeData({
                    weight: validateFloat(weight),
                })
            );
        },
        [dispatch]
    );

    const onChangeDescription = useCallback(
        (description) => {
            dispatch(createGoodActions.changeData({ description }));
        },
        [dispatch]
    );

    const onChangeFile = useCallback(
        (image) => {
            setImage(image);
        },
        [setImage]
    );

    const onCreateGood = useCallback(() => {
        dispatch(sendCreateGoodData({ ...data, image }));
    }, [dispatch, data, image]);

    return (
        <div className={classNames(cls.CreateGood, {}, [className])}>
            <span className={cls.title}> Создание товара </span>
            <div className={cls.error}>{error}</div>
            <Input
                label="Название"
                className={cls.input}
                value={name}
                onChange={onChangeName}
            />
            <Input
                label="Цена"
                className={cls.input}
                value={price}
                onChange={onChangePrice}
            />
            <Input
                label="Вес (кг)"
                className={cls.input}
                value={weight}
                onChange={onChangeWeight}
            />
            <TextArea
                label={"Описание"}
                className={cls.input}
                value={description}
                onChange={onChangeDescription}
            />
            <Input
                type="file"
                className={cls.input}
                label="Фотография"
                onChange={onChangeFile}
            />
            <Button
                theme="primary"
                className={cls.createBtn}
                onClick={onCreateGood}
            >
                Создать
            </Button>
        </div>
    );
};
