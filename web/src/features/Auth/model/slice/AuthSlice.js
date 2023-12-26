import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "shared/actions/actions";
import { PROFILE_LOCALSTORAGE_KEY } from "shared/const/localstorage";
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
    type: "client",
    isAuth: false,
    error: "",
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
        logout: (state, action) => {
            state.data = {};
            state.type = "client";
            state.isAuth = false;
            localStorage.removeItem(PROFILE_LOCALSTORAGE_KEY);
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(loginByFirstName.pending, (state) => {
            //     state.data.error = undefined;
            //     state.data.isLoading = true;
            // })
            .addCase(sendRegisterData.fulfilled, (state) => {
                state.isAuth = true;
                state.error = "";
            })
            .addCase(sendRegisterData.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(sendLoginData.fulfilled, (state) => {
                state.isAuth = true;
                state.error = "";
            })
            .addCase(sendLoginData.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(revertAll, () => initialState);
    },
});

// Action creators are generated for each case reducer function
export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
