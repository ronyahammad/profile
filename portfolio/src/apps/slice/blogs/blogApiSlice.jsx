import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the blog API slice
export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/articles',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Blog', 'User'],
    endpoints: (builder) => ({
        // Create a new blog post
        createBlog: builder.mutation({
            query: (blogData) => ({
                url: '/post/create',
                method: 'POST',
                body: blogData,
            }),
            invalidatesTags: ['Blog'],
        }),

        // Get blog post details by ID
        getDetailBlog: builder.query({
            query: (id) => `/post/${id}`,
            transformResponse: (response) => ({
                ...response.post,
                creatorName: response.post.creator.name || 'Anonymous',
            }),
            providesTags: ['Blog'],
        }),

        // Update an existing blog post by ID (for both user and admin)
        updateBlog: builder.mutation({
            query: ({ id, blogData }) => ({
                url: `/post/edit/${id}`,
                method: 'PUT',
                body: blogData,
            }),
            invalidatesTags: ['Blog'],
        }),

        // Get blog posts created by the authenticated user
        getBlogByUser: builder.query({
            query: () => '/post',
            transformResponse: (response) =>
                response.posts.map((post) => ({
                    title: post.title,
                    content: post.content,
                    creatorName: post.creator.name || 'Anonymous',
                })),
            providesTags: ['User'],
        }),

        // Get all blog posts (public)
        getBlogList: builder.query({
            query: () => '/postlists',
            transformResponse: (response) =>
                response.posts.map((post) => ({
                    title: post.title,
                    content: post.content,
                    creatorName: post.creator.name || 'Anonymous',
                })),
            providesTags: ['Blog'],
        }),

        // Delete a blog post by ID (for both user and admin)
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/post/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Blog'],
        }),
    }),
});

export const {
    useCreateBlogMutation,
    useGetDetailBlogQuery,
    useUpdateBlogMutation,
    useGetBlogByUserQuery,
    useGetBlogListQuery,
    useDeleteBlogMutation,
} = blogApi;
