import { createSocket } from "../WebSocket/webSocket";
import { getAuthToken } from "./getAuthToken";
import { toast } from "react-toastify";
import i18n from "../../utils/i18n/i18n";
import { chatApi } from "./chatApi";

export const socketApi = chatApi.injectEndpoints({
  endpoints: builder => ({
    subscribeToMessages: builder.query({
      queryFn: () => ({ data: null }),
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, dispatch },
      ) {
        try {
          await cacheDataLoaded

          const token = getAuthToken()
          const socket = createSocket(token)

          socket.on('connect_error', (err) => {
            toast.error(i18n.t('errors.socketConnectError'))
            console.error('Websocket connect error:', err)
          })

          socket.on('error', (err) => {
            toast.error(i18n.t('errors.socketError'))
            console.error('Websocket error:', err)
          })

          socket.on('newMessage', (message) => {
            dispatch(
              chatApi.util.updateQueryData(
                'getMessages',
                undefined,
                (draft) => {
                  if (!draft.some(m => m.id === message.id)) {
                    draft.push(message)
                  }
                },
              ),
            )
          })

          await cacheEntryRemoved
          socket.disconnect()
        }
        catch (error) {
          toast.error(i18n.t('errors.socketInitError'))
          console.error('Websocket initialization error:', error)
        }
      },
    }),
  })
})

export const { useSubscribeToMessagesQuery } = socketApi