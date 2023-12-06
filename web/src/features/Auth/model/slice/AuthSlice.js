import { createSlice } from "@reduxjs/toolkit";
import { PROFILE_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { sendRegisterData } from "../services/sendRegisterData";

const initialState = {
    data: {
        firstName: "",
        lastName: "",
        login: "",
        city: "",
        street: "",
        building: "",
        entrance: "",
        floor: "",
        aparts: "",
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
            state.data.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.data.lastName = action.payload;
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
            state.data.aparts = action.payload;
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
            localStorage.setItem(
                PROFILE_LOCALSTORAGE_KEY,
                JSON.stringify({ ...state.data, type: state.type })
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
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
