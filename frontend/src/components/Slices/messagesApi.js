import { chatApi } from './chatApi'

export const messagesApi = chatApi.injectEndpoints({
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => '/messages',
      providesTags: result => result ? [...result.map(({ id }) => ({ type: 'Messages', id })), 'Messages'] : ['Messages'],
    }),

    sendMessage: builder.mutation({
      query: message => ({
        url: '/messages',
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
})

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
} = messagesApi
