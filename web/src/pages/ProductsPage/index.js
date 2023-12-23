import { getProductsPageData } from "./model/selectors/getProductsPageData";
import {
    productsPageActions,
    productsPageReducer,
} from "./model/slice/productsPageSlice";
import { ProductsPage } from "./ui/ProductsPage";

export {
    ProductsPage,
    productsPageActions,
    productsPageReducer,
    getProductsPageData,
};
