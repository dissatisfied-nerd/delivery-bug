import { createSlice } from "@reduxjs/toolkit";
import { PROFILE_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { fetchStoreData } from "../services/fetchStoreData/fetchStoreData";
import { fetchStoreProducts } from "../services/fetchStoreProducts/fetchStoreProducts";

const initialState = {
    isLoading: false,
    data: {
        name: "",
        first_name: "",
        last_name: "",
        father_name: "",
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
    error: "",
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
                state.error = "";
                state.isLoading = true;
            })
            .addCase(fetchStoreData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.data = action.payload.store;
            })
            .addCase(fetchStoreData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchStoreProducts.pending, (state) => {
                state.error = "";
                state.isLoading = true;
            })
            .addCase(fetchStoreProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = "";
                state.products = action.payload.products || [];
            })
            .addCase(fetchStoreProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: storeActions } = storeSlice;
export const { reducer: storeReducer } = storeSlice;
