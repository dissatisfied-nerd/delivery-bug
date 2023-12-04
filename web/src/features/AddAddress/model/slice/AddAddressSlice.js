import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        city: "",
        street: "",
        building: "",
        entrance: "",
        floor: "",
        aparts: "",
    },
    isDisplay: false,
    error: "",
};

export const addAddressSlice = createSlice({
    name: "addAddress",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = { ...state.data, ...action.payload };
        },
        setDefaultData: (state, action) => {
            state.data = { ...initialState.data };
        },
        setIsDisplay: (state, action) => {
            state.isDisplay = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { actions: addAddressActions } = addAddressSlice;
export const { reducer: addAddressReducer } = addAddressSlice;
