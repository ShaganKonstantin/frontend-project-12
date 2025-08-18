import { channelsApi } from './channelsApi'
import { messagesApi } from './messagesApi'
import { socketApi } from './socketApi'

export * from './getAuthToken'
export * from './chatApi'

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
} = channelsApi

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
} = messagesApi

export const {
  useSubscribeToMessagesQuery,
} = socketApi
