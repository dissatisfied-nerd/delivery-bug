export const getAuthIsAuth = (state) => state.auth.isAuth;
export const getAuthData = (state) => state.auth.data;
export const getAuthType = (state) => state.auth.type || "client";
export const getAuthError = (state) => state.auth.error || "";
