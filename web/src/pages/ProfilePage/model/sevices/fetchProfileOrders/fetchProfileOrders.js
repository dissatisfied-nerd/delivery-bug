import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    clientActions,
    fetchClientData,
    fetchClientOrders,
} from "entities/Client";
import { courierActions, fetchCourierOrders } from "entities/Courier";
import { fetchGoodData } from "entities/Good";
import { authActions, getAuthType } from "features/Auth";

export const fetchProfileOrders = createAsyncThunk(
    "profile/fetchProfileOrders",
    async (id, thunkAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI;
        const type = getAuthType(getState());

        try {
            let response;
            if (type === "client") {
                dispatch(fetchClientOrders(id));
            } else {
                const { payload: orders } = await dispatch(
                    fetchCourierOrders(id)
                );
                if (orders) {
                    const clientsInfo = orders.map(async (order) => {
                        const { payload } = await dispatch(
                            fetchClientData({
                                id: order.client_id,
                                isAuth: true,
                            })
                        );
                        return payload;
                    });
                    Promise.all(clientsInfo).then((clients) =>
                        clients.forEach((client, i) =>
                            dispatch(
                                courierActions.setClientDataInOrder({
                                    client,
                                    i,
                                })
                            )
                        )
                    );
                }
            }

            return response.data;
        } catch (e) {
            return rejectWithValue("error");
        }
    }
);
