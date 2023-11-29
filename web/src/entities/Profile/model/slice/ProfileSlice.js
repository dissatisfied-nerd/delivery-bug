import { createSlice } from "@reduxjs/toolkit";
import { PROFILE_LOCALSTORAGE_KEY } from "shared/const/localstorage";

const initialState = {
    isLoading: false,
    data: {
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        street: "",
        building: "",
        entrance: "",
        floor: "",
        aparts: "",
        password: "",
        type: "client",
    },
    orders: [],
    isAuth: false,
    error: "",
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        initProfileData: (state, action) => {
            const data = localStorage.getItem(PROFILE_LOCALSTORAGE_KEY);
            if (data) {
                state.data = JSON.parse(data);
                state.isAuth = true;
            }
        },
        setFirstName: (state, action) => {
            state.data.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.data.lastName = action.payload;
        },
        setEmail: (state, action) => {
            state.data.email = action.payload;
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
            state.data.type = action.payload;
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        addOrder: (state, action) => {
            state.orders = [...state.orders, action.payload];
        },
        saveAuthData: (state, action) => {
            localStorage.setItem(
                PROFILE_LOCALSTORAGE_KEY,
                JSON.stringify(state.data)
            );
        },
        logout: (state, action) => {
            state.data = {};
            state.isAuth = false;
            localStorage.removeItem(PROFILE_LOCALSTORAGE_KEY);
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loginByFirstName.pending, (state) => {
    //             state.data.error = undefined;
    //             state.data.isLoading = true;
    //         })
    //         .addCase(loginByFirstName.fulfilled, (state) => {
    //             state.data.isLoading = false;
    //         })
    //         .addCase(loginByFirstName.rejected, (state, action) => {
    //             state.data.isLoading = false;
    //             state.data.error = action.payload;
    //         });
    // },
});

// Action creators are generated for each case reducer function
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
