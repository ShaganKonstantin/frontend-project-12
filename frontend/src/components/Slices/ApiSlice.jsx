import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getAuthToken = () => {
    const token = localStorage.getItem('AuthorizationToken');
    return token ? JSON.parse(token) : null;
}

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    prepareHeaders: (headers) => {
        const token = getAuthToken();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
    endpoints: builder => ({
        getChannels: builder.query({
            query: () => '/channels'
        }),
        getMessages: builder.query({
            query: () => '/messages'
        })
    })
})

export const {
    useGetChannelsQuery,
    useGetMessagesQuery
} = chatApi