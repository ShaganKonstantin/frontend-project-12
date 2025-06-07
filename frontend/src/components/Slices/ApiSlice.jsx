import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getAuthToken = () => {
    return localStorage.getItem('AuthorizationToken');
}

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: '/api/v1', 
        credentials: 'include',
        prepareHeaders: (headers) => {
        const token = getAuthToken();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
        },
     }),
    endpoints: builder => ({
        getChannels: builder.query({
            query: () => '/channels'
        }),
        getMessages: builder.query({
            query: () => '/messages'
        }),
        sendMessage: builder.mutation({
            query: (message) => ({
                url: '/messages',
                method: 'POST',
                body: message
            })
        })
    })
})

export const {
    useGetChannelsQuery,
    useGetMessagesQuery,
    useSendMessageMutation
} = chatApi