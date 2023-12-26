import {
    getAuthData,
    getAuthInited,
    getAuthIsAuth,
    getAuthIsLoading,
    getAuthType,
} from "./model/selectors/getAuthData";
import { logout } from "./model/services/logout/logout";
import { authActions, authReducer } from "./model/slice/AuthSlice";
import { AuthForm } from "./ui/AuthForm";

export {
    AuthForm,
    authActions,
    authReducer,
    getAuthData,
    getAuthIsAuth,
    getAuthType,
    logout,
    getAuthIsLoading,
    getAuthInited,
};
