import {
    getStoreData,
    getStoreProducts,
    getStoreId,
    getStoreError,
} from "./model/selectors/getStoreData";
import { fetchStoreData } from "./model/services/fetchStoreData/fetchStoreData";
import { storeActions, storeReducer } from "./model/slice/storeSlice";

export {
    storeActions,
    storeReducer,
    getStoreData,
    getStoreProducts,
    getStoreId,
    fetchStoreData,
    getStoreError,
};
