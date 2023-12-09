import { createSlice } from "@reduxjs/toolkit";
import { PROFILE_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { sendLoginData } from "../services/sendLoginData/sendLoginData";
import { sendRegisterData } from "../services/sendRegisterData/sendRegisterData";

const initialState = {
    data: {
        first_name: "",
        last_name: "",
        login: "",
        city: "",
        street: "",
        building: "",
        entrance: "",
        floor: "",
        apartment: "",
        password: "",
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
        setFirstName: (state, action) => {
            state.data.first_name = action.payload;
        },
        setLastName: (state, action) => {
            state.data.last_name = action.payload;
        },
        setLogin: (state, action) => {
            state.data.login = action.payload;
        },
        setCity: (state, action) => {
            state.data.city = action.payload;
        },
        setStreet: (state, action) => {
            state.data.street = action.payload;
        },
        setBuilding: (state, action) => {
            state.data.building = action.payload;
        },
        setEntrance: (state, action) => {
            state.data.entrance = action.payload;
        },
        setFloor: (state, action) => {
            state.data.floor = action.payload;
        },
        setAparts: (state, action) => {
            state.data.apartment = action.payload;
        },
        setPassword: (state, action) => {
            state.data.password = action.payload;
        },
        setType: (state, action) => {
            state.type = action.payload;
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        saveAuthData: (state, action) => {
            const profile =
                JSON.parse(localStorage.getItem(PROFILE_LOCALSTORAGE_KEY)) ||
                {};
            localStorage.setItem(
                PROFILE_LOCALSTORAGE_KEY,
                JSON.stringify({
                    ...state.data,
                    type: state.type,
                    ...profile,
                    ...action.payload,
                })
            );
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
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
