import {
    getCourierErrorData,
    getCourierErrorOrders,
    getCourierIsLoadingData,
    getCourierIsLoadingOrders,
    getCourierOrders,
} from "./model/selectors/getCourierData";

import { courierActions } from "./model/slice/CourierSlice";
import { courierReducer } from "./model/slice/CourierSlice";
import { getCourierData } from "./model/selectors/getCourierData";
import { getCourierId } from "./model/selectors/getCourierData";
import { fetchCourierData } from "./model/services/fetchCourierData/fetchCourierData";
import { fetchCourierOrders } from "./model/services/fetchCourierOrders/fetchCourierOrders";

export {
    courierReducer,
    courierActions,
    getCourierData,
    getCourierOrders,
    getCourierId,
    fetchCourierData,
    fetchCourierOrders,
    getCourierIsLoadingData,
    getCourierIsLoadingOrders,
    getCourierErrorData,
    getCourierErrorOrders,
};
