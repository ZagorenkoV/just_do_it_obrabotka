import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { authReducer } from 'features/authorization/model/slice/authSlice';
import { categoryReducer } from 'entities/category';

export const rootReducer = combineReducers({
    category: categoryReducer,
    auth: authReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
