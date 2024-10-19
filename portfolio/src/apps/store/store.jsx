import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { infosApi } from '../slice/infos/infosApiSlice';
import { weatherApi } from '../slice/infos/weatherApiSlice';
import { authApi } from '../slice/auth/AuthApiSlice'
import { profileApi } from '../slice/Profiles/profileApiSlice'
import { blogApi } from '../slice/blogs/blogApiSlice';
import loadingReducer from '../slice/LoadingSlice';
import authReducer from '../slice/auth/AuthSlice'

export const store = configureStore({
    reducer: {
        [infosApi.reducerPath]: infosApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [weatherApi.reducerPath]: weatherApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        loading: loadingReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(blogApi.middleware)
            .concat(profileApi.middleware)
            .concat(infosApi.middleware)
            .concat(weatherApi.middleware),
});


setupListeners(store.dispatch);
