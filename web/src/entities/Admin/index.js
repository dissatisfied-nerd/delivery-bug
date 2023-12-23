import { getAdminError } from "./model/selectors/getAdminData";
import { deleteProduct } from "./model/services/deleteProduct";
import { adminActions, adminReducer } from "./model/slice/adminSlice";

export { adminActions, adminReducer, deleteProduct, getAdminError };
