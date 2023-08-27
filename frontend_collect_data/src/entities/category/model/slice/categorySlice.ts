import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategorySchema } from 'entities/category';
import { CategoryTypes } from 'entities/category/model/types/categorySchema';

const initialState: CategorySchema = {
    categoryType: CategoryTypes.VK,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategoryType(state, action: PayloadAction<string>) {
            state.categoryType = action.payload;
        },
        resetCategory(state = initialState) {
            state.categoryType = 'vk';
        },
    },
});

export const {
    setCategoryType, resetCategory,
} = categorySlice.actions;

export const { reducer: categoryReducer } = categorySlice;
