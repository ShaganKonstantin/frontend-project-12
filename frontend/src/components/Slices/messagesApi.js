import { chatApi } from './chatApi'
import { toast } from 'react-toastify'
import i18n from '../../utils/i18n/i18n'

export const messagesApi = chatApi.injectEndpoints({
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => '/messages',
      transformErrorResponse: (response) => {
        toast.error(i18n.t('errors.messagesLoadError'))
        return response
      },
      providesTags: result => result ? [...result.map(({ id }) => ({ type: 'Messages', id })), 'Messages'] : ['Messages'],
    }),

    sendMessage: builder.mutation({
      query: message => ({
        url: '/messages',
        method: 'POST',
        body: message,
      }),
      transformErrorResponse: (response) => {
        toast.error(i18n.t('errors.messageSendError'))
        return response
      },
      invalidatesTags: ['Messages'],
    }),
  }),
})

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
} = messagesApi
