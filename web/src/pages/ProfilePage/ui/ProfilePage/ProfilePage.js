import { getAuthType } from "features/Auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Page } from "widgets/Page/Page";
import cls from "./ProfilePage.module.scss";
import { getProfileData } from "../../model/sevices/fetchProfileData/fetchProfileData";
import { ProfileClient } from "./ProfileClient/ProfileClient";
import { ProfileCourier } from "./ProfileCourier/ProfileCourier";
import { ProfileMarket } from "./ProfileMarket/ProfileMarket";

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const type = useSelector(getAuthType);

    useEffect(() => {
        dispatch(getProfileData(type));
    }, []);

    // // TESTING
    // return (
    //     <Page>
    //         <ProfileMarket />
    //     </Page>
    // );

    if (type === "client") {
        return (
            <Page>
                <ProfileClient />
            </Page>
        );
    } else if (type === "courier") {
        return (
            <Page>
                <ProfileCourier />
            </Page>
        );
    } else if (type === "market") {
        return (
            <Page>
                <ProfileMarket />
            </Page>
        );
    }
};
