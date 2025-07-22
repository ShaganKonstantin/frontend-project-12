import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSocket } from "../WebSocket/webSocket";

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
    tagTypes: ['Messages', 'Channels'],
    endpoints: builder => ({
        getChannels: builder.query({
            query: () => '/channels',
            providesTags: ['Channels']
        }),

        getMessages: builder.query({
            query: () => '/messages',
            providesTags: (result) => result ? [...result.map(({id}) => ({type: 'Messages', id})), 'Messages'] : ['Messages']
        }),

        sendMessage: builder.mutation({
            query: (message) => ({
                url: '/messages',
                method: 'POST',
                body: message
            }),
            invalidatesTags: ['Messages']
        }),
        
        subscribeToMessages: builder.query({
            queryFn: () => ({data: null}), 
            async onCacheEntryAdded(
                arg,
                { cacheDataLoaded, cacheEntryRemoved, dispatch }
            ) {
                try{
                    await cacheDataLoaded;
                    
                    const token = getAuthToken();
                    const socket = createSocket(token);

                    socket.on('newMessage', (message) => {
                        dispatch(
                            chatApi.util.updateQueryData(
                            'getMessages',
                            undefined,
                            (draft) => {
                                if (!draft.some(m => m.id === message.id)) {
                                    draft.push(message);
                  }
                            }
                            )
                        )    
                    });

                    await cacheEntryRemoved;
                    socket.disconnect();
                } catch (error) {
                    console.error('Websocket error', error)
                }
            }
        }),

        addChannel: builder.mutation({
            query: (channel) => ({
                url: '/channels',
                method: 'POST',
                body: { name: channel.name },
            }),
            transformResponse: (response) => {
                if (!response.id) {
                    throw new Error('Неверный формат ответа сервера');
                }
                return response;
            },
            invalidatesTags: ['Channels'],
            transformErrorResponse: (response) => {
                return response.data;
            }
        }),

        renameChannel: builder.mutation({
            query: ({ id, name }) => ({
                url: `/channels/${id}`,
                method: 'PATCH',
                body: { name },
            }),
            invalidatesTags: ['Channels'],
            transformErrorResponse: (response) => {
                return response.data;
            }
        }),

        removeChannel: builder.mutation({
            query: (id) => ({
                url: `/channels/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: ['Channels'],
            transformErrorResponse: (response) => {
                return response.data;
            }
        })
    })
})

export const {
    useGetChannelsQuery,
    useGetMessagesQuery,
    useSendMessageMutation,
    useSubscribeToMessagesQuery,
    useAddChannelMutation,
    useRenameChannelMutation,
    useRemoveChannelMutation,
} = chatApi