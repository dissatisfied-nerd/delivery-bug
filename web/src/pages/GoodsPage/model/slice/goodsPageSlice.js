import { createSlice } from "@reduxjs/toolkit";
import { fetchGoodsPageData } from "../services/fetchGoodsPageData";

const initialState = {
    goods: [],
};

export const goodsPageSlice = createSlice({
    name: "goodsPage",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGoodsPageData.fulfilled, (state, action) => {
            state.goods = action.payload ?? [];
        });
    },
});

// Action creators are generated for each case reducer function
export const { actions: goodsPageActions } = goodsPageSlice;
export const { reducer: goodsPageReducer } = goodsPageSlice;
