import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: '/api/user',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }, 
    }),
    tagTypes: ['Profile', 'Users'], 
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => '/detail',
            providesTags: ['Profile'],
        }),
        updateProfile: builder.mutation({
            query: (profileData) => ({
                url: '/update',
                method: 'PUT',
                body: profileData,
            }),
            invalidatesTags: ['Profile'], 
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'], 
        }),
        getAllUsers: builder.query({
            query: () => '/list',
            providesTags: ['Users'],
        }),
    }),
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useDeleteUserMutation,
    useGetAllUsersQuery,
} = profileApi;
