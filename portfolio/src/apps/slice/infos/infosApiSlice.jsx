/* import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the infos API slice
export const infosApi = createApi({
    reducerPath: 'infosApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }), 
    endpoints: (builder) => ({
        getInfos: builder.query({
            query: () => 'infos',
            transformResponse: (response) => {
                return response.data.map(info => ({
                    title: info.title || 'No Title',
                    subtitle: info.subtitle || 'No Subtitle',
                    content: info.content || 'No Content available',
                    tags: info.tags || 'No Tags Available', 
                }));
            }

        }),
    }),
});


export const { useGetInfosQuery } = infosApi;
 */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the infos API slice
export const infosApi = createApi({
    reducerPath: 'infosApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    tagTypes: ['Infos'], // Add tag types for invalidating cache
    endpoints: (builder) => ({
        // Fetch all infos
        getInfos: builder.query({
            query: () => 'infos',
            transformResponse: (response) => {
                return response.data.map(info => ({
                    id: info._id, // Add the ID for operations like update and delete
                    title: info.title || 'No Title',
                    subtitle: info.subtitle || 'No Subtitle',
                    content: info.content || 'No Content available',
                    tags: info.tags || 'No Tags Available',
                    creator: info.creator?.name || 'Unknown',
                    createdAt: info.createdAt
                }));
            },
            providesTags: ['Infos'], // Marks this data for cache invalidation
        }),

        // Fetch a single info by ID
        getInfoById: builder.query({
            query: (id) => `infos/${id}`,
            transformResponse: (response) => ({
                id: response.data._id,
                title: response.data.title,
                subtitle: response.data.subtitle,
                content: response.data.content,
                tags: response.data.tags,
                creator: response.data.creator?.name,
                createdAt: response.data.createdAt,
            }),
            providesTags: (result, error, id) => [{ type: 'Infos', id }],
        }),

        // Fetch infos by tags
        getInfosByTags: builder.query({
            query: (tags) => ({
                url: 'infos/tags',
                method: 'POST',
                body: { tags }
            }),
            transformResponse: (response) => {
                return response.data.map(info => ({
                    id: info._id,
                    title: info.title,
                    subtitle: info.subtitle,
                    content: info.content,
                    tags: info.tags,
                }));
            },
            providesTags: ['Infos'],
        }),

        // Create a new info
        createInfo: builder.mutation({
            query: (infoData) => ({
                url: 'infos',
                method: 'POST',
                body: infoData
            }),
            invalidatesTags: ['Infos'], // Invalidates cache to update info list
        }),

        // Update an existing info by ID
        updateInfo: builder.mutation({
            query: ({ id, infoData }) => ({
                url: `infos/${id}`,
                method: 'PUT',
                body: infoData
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Infos', id }], // Invalidates the cache for the specific info
        }),

        // Delete an info by ID
        deleteInfo: builder.mutation({
            query: (id) => ({
                url: `infos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Infos', id }], // Invalidates the cache for the deleted info
        }),
    }),
});

// Export hooks for each API call
export const {
    useGetInfosQuery,
    useGetInfoByIdQuery,
    useGetInfosByTagsQuery,
    useCreateInfoMutation,
    useUpdateInfoMutation,
    useDeleteInfoMutation
} = infosApi;
