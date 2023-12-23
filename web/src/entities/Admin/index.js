import { getAdminError } from "./model/selectors/getAdminData";
import { deleteGood } from "./model/services/deleteGood";
import { adminActions, adminReducer } from "./model/slice/adminSlice";

export { adminActions, adminReducer, deleteGood, getAdminError };
