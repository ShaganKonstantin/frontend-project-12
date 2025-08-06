import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSocket } from "../WebSocket/webSocket"; 
import { toast } from 'react-toastify';
import i18n from '../../utils/i18n/i18n';

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
            transformErrorResponse: (response) => {
                toast.error(i18n.t('errors.channelsLoadError'));
                return response;
            },
            providesTags: ['Channels']
        }),

        getMessages: builder.query({
            query: () => '/messages',
            transformErrorResponse: (response) => {
                toast.error(i18n.t('errors.messagesLoadError'));
                return response;
            },
            providesTags: (result) => result ? [...result.map(({id}) => ({type: 'Messages', id})), 'Messages'] : ['Messages']
        }),

        sendMessage: builder.mutation({
            query: (message) => ({
                url: '/messages',
                method: 'POST',
                body: message
            }),
            transformErrorResponse: (response) => {
                toast.error(i18n.t('errors.messageSendError'));
                return response;
            },
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
                    
                    socket.on('connect_error', (err) => {
                        toast.error(i18n.t('errors.socketConnectError'));
                        console.error('Websocket connect error:', err)
                    });

                    socket.on('error', (err) => {
                        toast.error(i18n.t('errors.socketError'));
                        console.error('Websocket error:', err)
                    });

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
                    toast.error(i18n.t('errors.socketInitError'))
                    console.error('Websocket initialization error:', error);
                }
            }
        }),

        addChannel: builder.mutation({
            query: (channel) => ({
                url: '/channels',
                method: 'POST',
                body: { name: channel.name },
            }),
            transformErrorResponse: (response) => {
                const errorMessage = response.data?.message || i18n.t('channelAddError');
                toast.error(errorMessage);
                return response;
            },
            invalidatesTags: ['Channels'],
        }),

        renameChannel: builder.mutation({
            query: ({ id, name }) => ({
                url: `/channels/${id}`,
                method: 'PATCH',
                body: { name },
            }),
            transformErrorResponse: (response) => {
                const errorMessage = response.data?.message || i18n.t('channelRenameError');
                toast.error(errorMessage);
                return response;
            },
            invalidatesTags: ['Channels'],
        }),

        removeChannel: builder.mutation({
            query: (id) => ({
                url: `/channels/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            transformErrorResponse: (response) => {
                const errorMessage = response.data?.message || i18n.t('channelRemoveError');
                toast.error(errorMessage);
                return response;
            },
            invalidatesTags: ['Channels'],
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