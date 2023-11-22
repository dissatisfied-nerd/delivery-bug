import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    username: "",
    email: "",
    city: "",
    street: "",
    building: "",
    entrance: "",
    floor: "",
    aparts: "",
    password: "",
    error: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setCity: (state, action) => {
            state.city = action.payload;
        },
        setStreet: (state, action) => {
            state.street = action.payload;
        },
        setBuilding: (state, action) => {
            state.building = action.payload;
        },
        setEntrance: (state, action) => {
            state.entrance = action.payload;
        },
        setFloor: (state, action) => {
            state.floor = action.payload;
        },
        setAparts: (state, action) => {
            state.aparts = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loginByUsername.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(loginByUsername.fulfilled, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(loginByUsername.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

// Action creators are generated for each case reducer function
export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
