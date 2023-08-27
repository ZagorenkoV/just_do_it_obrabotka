import { createSlice } from '@reduxjs/toolkit';
import { decryptData } from 'shared/lib/crypt/crypt';
import { AuthSchema } from '../types/authSchema';

const initialState: AuthSchema = {
    isAuth: decryptData,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogin(state) {
            state.isAuth = 'admin';
        },
        authLogout(state) {
            state.isAuth = '';
        },
    },
});

export const { authLogin, authLogout } = authSlice.actions;

export const { reducer: authReducer } = authSlice;
