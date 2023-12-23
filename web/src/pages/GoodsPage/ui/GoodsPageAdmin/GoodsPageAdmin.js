import { deleteGood, getAdminError } from "entities/Admin";
import { GoodList } from "entities/Good";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGoodsPageData } from "../../model/selectors/getGoodsPageData";
import { fetchGoodsPageData } from "../../model/services/fetchGoodsPageData";
import cls from "../GoodsPage.module.scss";

export const GoodsPageAdmin = () => {
    const dispatch = useDispatch();
    const goods = useSelector(getGoodsPageData);
    const error = useSelector(getAdminError);

    const onDeleteGood = useCallback(
        (id) => {
            console.log(id);
            dispatch(deleteGood(id));
            if (!error) {
                dispatch(fetchGoodsPageData());
            }
        },
        [dispatch, error]
    );

    return (
        <>
            <div className={cls.error}>{error}</div>
            <GoodList
                className={cls.GoodList}
                goods={goods}
                type="big"
                isAdmin={true}
                onDeleteGood={onDeleteGood}
            />
        </>
    );
};
