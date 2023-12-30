import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "shared/actions/actions";
import { PROFILE_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { logout } from "../services/logout/logout";
import { sendLoginData } from "../services/sendLoginData/sendLoginData";
import { sendRegisterData } from "../services/sendRegisterData/sendRegisterData";

const initialState = {
    data: {
        name: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        login: "",
        city: "",
        street: "",
        building: "",
        entrance: "",
        floor: "",
        apartment: "",
        password: "",
        passphrase: "",
    },
    isLoading: false,
    type: "client",
    isAuth: false,
    error: "",
    inited: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        initAuthData: (state, action) => {
            const { type, ...data } = action.payload;
            state.isAuth = true;
            state.data = data;
            state.type = type;
            state.inited = true;
        },
        changeData: (state, action) => {
            state.data = {
                ...state.data,
                ...action.payload,
            };
        },
        setType: (state, action) => {
            state.type = action.payload;
        },
        saveAuthData: (state, action) => {
            const profile =
                JSON.parse(localStorage.getItem(PROFILE_LOCALSTORAGE_KEY)) ||
                {};
            const { password, passphrase, ...data } = state.data;
            localStorage.setItem(
                PROFILE_LOCALSTORAGE_KEY,
                JSON.stringify({
                    ...profile,
                    type: state.type,
                    ...data,
                    ...action.payload,
                })
            );
        },
        emptyError: (state, action) => {
            state.error = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendRegisterData.pending, (state) => {
                state.error = "";
                state.isLoading = true;
            })
            .addCase(sendRegisterData.fulfilled, (state) => {
                state.isAuth = true;
                state.error = "";
                state.isLoading = false;
            })
            .addCase(sendRegisterData.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
                state.isAuth = false;
            })
            .addCase(sendLoginData.pending, (state) => {
                state.error = "";
                state.isLoading = true;
            })
            .addCase(sendLoginData.fulfilled, (state) => {
                state.isAuth = true;
                state.error = "";
                state.isLoading = false;
            })
            .addCase(sendLoginData.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
                state.isAuth = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.data = {};
                state.type = "client";
                state.isAuth = false;
                localStorage.removeItem(PROFILE_LOCALSTORAGE_KEY);
            })
            .addCase(revertAll, (state) => {
                state.data = initialState.data;
                state.isLoading = false;
                state.type = "client";
                state.isAuth = false;
                state.error = "";
                state.inited = true;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
