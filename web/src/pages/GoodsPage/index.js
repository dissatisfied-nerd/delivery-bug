import { getGoodsPageData } from "./model/selectors/getGoodsPageData";
import {
    goodsPageActions,
    goodsPageReducer,
} from "./model/slice/goodsPageSlice";
import { GoodsPage } from "./ui/GoodsPage";

export { GoodsPage, goodsPageActions, goodsPageReducer, getGoodsPageData };
