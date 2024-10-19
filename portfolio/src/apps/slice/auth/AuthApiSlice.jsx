import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/',
        credentials: 'include' 
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        refreshToken: builder.mutation({  
            query: () => ({
                url: 'auth/refreshtoken',
                method: 'POST', 
            }),
        }),    
    }),
});

export const { useLoginMutation, useRefreshTokenMutation } = authApi;
