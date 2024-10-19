import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/apiinfo/' }),
    endpoints: (builder) => ({
        getWeather: builder.query({
            // Change the query to POST and include the body
            query: ({ lat, lon }) => ({
                url: 'weather',  // Assuming your backend expects the weather endpoint to receive lat/lon as POST data
                method: 'POST',
                body: { lat, lon },  // Pass lat and lon in the request body
            }),
            transformResponse: (response) => ({
                name: response.name || 'Unknown Location',
                country: response.sys.country || '',
                temperature: response.main.temp || 'N/A',
                weatherMain: response.weather[0].main || 'N/A',
                description: response.weather[0].description || 'N/A',
                icon: response.weather[0].icon || '',
            })
        }),
    }),
});

export const { useGetWeatherQuery } = weatherApi;
