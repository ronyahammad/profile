import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    useInfo:null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.useInfo = action.payload.useInfo;
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('useInfo', JSON.stringify(action.payload.useInfo));
        },
        clearAuth: (state) => {
            state.accessToken = null;
            state.useInfo = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('useInfo');
        }
    },
});

export const { setAccessToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;
