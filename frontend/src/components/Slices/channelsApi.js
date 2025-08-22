import { chatApi } from './chatApi'
import { toast } from 'react-toastify'
import i18n from '../../utils/i18n/i18n'

export const channelsApi = chatApi.injectEndpoints({
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => '/channels',
      transformErrorResponse: (response, meta) => {
        if (meta.response?.status !== undefined) {
          toast.error(i18n.t('errors.channelsLoadError'))
        }
        return response
      },
      providesTags: ['Channels'],
    }),

    addChannel: builder.mutation({
      query: channel => ({
        url: '/channels',
        method: 'POST',
        body: { name: channel.name },
      }),
      transformErrorResponse: (response, meta) => {
        if (meta.response?.status !== undefined) {
          const errorMessage = response.data?.message || i18n.t('errors.channelAddError')
          toast.error(errorMessage)
        }
        return response
      },
      invalidatesTags: ['Channels'],
    }),

    renameChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: `/channels/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      transformErrorResponse: (response, meta) => {
        if (meta.response?.status !== undefined) {
          const errorMessage = response.data?.message || i18n.t('errors.channelRenameError')
          toast.error(errorMessage)
        }
        return response
      },
      invalidatesTags: ['Channels'],
    }),

    removeChannel: builder.mutation({
      query: id => ({
        url: `/channels/${id}`,
        method: 'DELETE',
        body: { id },
      }),
      transformErrorResponse: (response, meta) => {
        if (meta.response?.status !== undefined) {
          const errorMessage = response.data?.message || i18n.t('errors.channelRemoveError')
          toast.error(errorMessage)
        }
        return response
      },
      invalidatesTags: ['Channels'],
    }),
  }),
})

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
} = channelsApi
