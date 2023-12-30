import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "shared/actions/actions";
import { fetchStoreData } from "../services/fetchStoreData/fetchStoreData";
import { fetchStoreProducts } from "../services/fetchStoreProducts/fetchStoreProducts";

const initialState = {
    isLoadingData: false,
    isLoadingProducts: false,
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
    },
    store_id: "",
    products: [],
    errorData: "",
    errorProducts: "",
};

export const storeSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        setStoreData: (state, action) => {
            const { store_id, ...data } = action.payload;
            state.data = data;
            state.store_id = store_id;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStoreData.pending, (state) => {
                state.errorData = "";
                state.isLoadingData = true;
            })
            .addCase(fetchStoreData.fulfilled, (state, action) => {
                state.isLoadingData = false;
                state.errorData = "";
                state.data = action.payload.store;
            })
            .addCase(fetchStoreData.rejected, (state, action) => {
                state.isLoadingData = false;
                state.errorData = action.payload;
            })
            .addCase(fetchStoreProducts.pending, (state) => {
                state.errorProducts = "";
                state.isLoadingProducts = true;
            })
            .addCase(fetchStoreProducts.fulfilled, (state, action) => {
                state.isLoadingProducts = false;
                state.errorProducts = "";
                state.products = action.payload.products || [];
            })
            .addCase(fetchStoreProducts.rejected, (state, action) => {
                state.isLoadingProducts = false;
                state.errorProducts = action.payload;
            })
            .addCase(revertAll, () => initialState);
    },
});

// Action creators are generated for each case reducer function
export const { actions: storeActions } = storeSlice;
export const { reducer: storeReducer } = storeSlice;
