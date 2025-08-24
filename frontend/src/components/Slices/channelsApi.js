import { chatApi } from './chatApi'
import { toast } from 'react-toastify'
import i18n from '../../utils/i18n/i18n'

const isNetworkError = error => error?.status === 'FETCH_ERROR' || error?.error === 'TypeError'

export const channelsApi = chatApi.injectEndpoints({
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => '/channels',
      transformErrorResponse: (response, meta) => {
        if (meta.response?.status !== undefined) {
          toast.error(i18n.t('errors.channelsLoadError'))
        }
        else if (isNetworkError(meta)) {
          toast.error(i18n.t('errors.networkError'))
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
      invalidatesTags: ['Channels'],
    }),

    renameChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: `/channels/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: ['Channels'],
    }),

    removeChannel: builder.mutation({
      query: id => ({
        url: `/channels/${id}`,
        method: 'DELETE',
        body: { id },
      }),
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
