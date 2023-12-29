import { fetchProductData } from "./model/services/fetchProductData/fetchProductData";
import { productDetailsReducer } from "./model/slice/productDetailsSlice";
import { ProductDetails } from "./ui/ProductDetails/ProductDetails";
import { ProductList } from "./ui/ProductList/ProductList";

export { ProductList, fetchProductData, ProductDetails, productDetailsReducer };
