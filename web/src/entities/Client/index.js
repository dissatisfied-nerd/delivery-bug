import {
    getClientErrorData,
    getClientErrorOrders,
    getClientIsLoadingData,
    getClientIsLoadingOrders,
    getClientOrders,
} from "./model/selectors/getClientData";

import { clientActions } from "./model/slice/ClientSlice";
import { clientReducer } from "./model/slice/ClientSlice";
import { getClientData } from "./model/selectors/getClientData";
import { getClientId } from "./model/selectors/getClientData";
import { fetchClientData } from "./model/services/fetchClientData/fetchClientData";
import { fetchClientOrders } from "./model/services/fetchClientOrders/fetchClientOrders";

export {
    clientReducer,
    clientActions,
    getClientData,
    getClientOrders,
    getClientId,
    fetchClientData,
    fetchClientOrders,
    getClientErrorData,
    getClientErrorOrders,
    getClientIsLoadingData,
    getClientIsLoadingOrders,
};
