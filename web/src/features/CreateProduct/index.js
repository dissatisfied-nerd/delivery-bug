import {
    getCreateProductIsLoading,
    getCreateProductIsProductCreated,
} from "./model/selectors/getCreateProductData";
import {
    createProductActions,
    createProductReducer,
} from "./model/slice/createProductSlice";
import { CreateProduct } from "./ui/CreateProduct";

export {
    CreateProduct,
    createProductActions,
    createProductReducer,
    getCreateProductIsProductCreated,
    getCreateProductIsLoading,
};
