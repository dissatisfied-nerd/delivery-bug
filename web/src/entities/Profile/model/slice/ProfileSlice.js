import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
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
    error: "",
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
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
        setType: (state, action) => {
            state.type = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loginByFirstName.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(loginByFirstName.fulfilled, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(loginByFirstName.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

// Action creators are generated for each case reducer function
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
