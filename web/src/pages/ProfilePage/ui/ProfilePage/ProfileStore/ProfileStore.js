import { OrderList } from "entities/Order";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "shared/ui/Card/Card";
import { Page } from "widgets/Page/Page";
import cls from "../ProfilePage.module.scss";
import { ProfileCard } from "../../ProfileCard/ProfileCard";
import { getClientData, getClientOrders } from "entities/Client";
import { fetchProfileOrders } from "pages/ProfilePage/model/sevices/fetchProfileOrders/fetchProfileOrders";
import { getStoreData, getStoreError, getStoreProducts } from "entities/Store";
import { ProductList } from "entities/Product";

export const ProfileStore = () => {
    const dispatch = useDispatch();
    const profile = useSelector(getStoreData);
    const products = useSelector(getStoreProducts);
    const error = useSelector(getStoreError);

    useEffect(() => {
        // dispatch(fetchProfileOrders("client"));
    }, []);

    return (
        <Page>
            <Card className={cls.ProfilePageCard}>
                <ProfileCard profile={profile} error={error} />
                <div className={cls.title}>Товары</div>
                <ProductList
                    products={[
                        {
                            id: 0,
                            name: "Гейнер",
                            price: 1200,
                            weight: 1,
                            description: `Многие спортсмены на определённом этапе сталкиваются с проблемой набора массы, когда мускулатура просто перестаёт расти, не смотря на все старания. Побороть этот неприятный момент поможет эффективный гейнер \nTOP MASS от Dr.Hoffman. \nВ его состав входит специально разработанный и тонко рассчитанный комплекс углеводов с высокими показателями биологической ценности и доступности.\n Трёхкомпонентная белковая матрица обеспечивает организм спортсмена широким спектром аминокислот, в том числе и незаменимых, а также глю`,
                            image: "https://ir.ozone.ru/s3/multimedia-d/wc1000/6667260673.jpg",
                        },
                        {
                            id: 0,
                            name: "Гейнер",
                            price: 1200,
                            weight: 1,
                            description:
                                "Многие спортсмены на определённом этапе сталкиваются с проблемой набора массы, когда мускулатура просто перестаёт расти, не смотря на все старания. Побороть этот неприятный момент поможет эффективный гейнер TOP MASS от Dr.Hoffman. В его состав входит специально разработанный и тонко рассчитанный комплекс углеводов с высокими показателями биологической ценности и доступности. Трёхкомпонентная белковая матрица обеспечивает организм спортсмена широким спектром аминокислот, в том числе и незаменимых, а также глю",
                            image: "https://ir.ozone.ru/s3/multimedia-d/wc1000/6667260673.jpg",
                        },
                        {
                            id: 0,
                            name: "Гейнер",
                            price: 1200,
                            weight: 1,
                            description:
                                "Многие спортсмены на определённом этапе сталкиваются с проблемой набора массы, когда мускулатура просто перестаёт расти, не смотря на все старания. Побороть этот неприятный момент поможет эффективный гейнер TOP MASS от Dr.Hoffman. В его состав входит специально разработанный и тонко рассчитанный комплекс углеводов с высокими показателями биологической ценности и доступности. Трёхкомпонентная белковая матрица обеспечивает организм спортсмена широким спектром аминокислот, в том числе и незаменимых, а также глю",
                            image: "https://ir.ozone.ru/s3/multimedia-d/wc1000/6667260673.jpg",
                        },
                        {
                            id: 0,
                            name: "Гейнер",
                            price: 1200,
                            weight: 1,
                            description:
                                "Многие спортсмены на определённом этапе сталкиваются с проблемой набора массы, когда мускулатура просто перестаёт расти, не смотря на все старания. Побороть этот неприятный момент поможет эффективный гейнер TOP MASS от Dr.Hoffman. В его состав входит специально разработанный и тонко рассчитанный комплекс углеводов с высокими показателями биологической ценности и доступности. Трёхкомпонентная белковая матрица обеспечивает организм спортсмена широким спектром аминокислот, в том числе и незаменимых, а также глю",
                            image: "https://ir.ozone.ru/s3/multimedia-d/wc1000/6667260673.jpg",
                        },
                    ]}
                    type="big"
                />
            </Card>
        </Page>
    );
};
