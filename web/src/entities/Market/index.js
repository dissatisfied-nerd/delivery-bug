import {
    getMarketData,
    getMarketGoods,
    getMarketId,
} from "./model/selectors/getMarketData";
import { fetchMarketData } from "./model/services/fetchMarketData/fetchMarketData";
import { marketActions, marketReducer } from "./model/slice/marketSlice";

export {
    marketActions,
    marketReducer,
    getMarketData,
    getMarketGoods,
    getMarketId,
    fetchMarketData,
};
