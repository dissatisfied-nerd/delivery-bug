import {
    getAuthData,
    getAuthIsAuth,
    getAuthType,
} from "./model/selectors/getAuthData";
import { authActions, authReducer } from "./model/slice/AuthSlice";
import { AuthForm } from "./ui/AuthForm";

export {
    AuthForm,
    authActions,
    authReducer,
    getAuthData,
    getAuthIsAuth,
    getAuthType,
};
