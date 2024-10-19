import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
