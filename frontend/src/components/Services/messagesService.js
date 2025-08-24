import { messagesApi } from '../Slices/messagesApi'
import { store } from '../Store/chatStore'
import i18n from '../../utils/i18n/i18n'
import { toast } from 'react-toastify'

const isNetworkError = error => error?.status === 'FETCH_ERROR' || error?.error === 'TypeError'

const sendMessagesService = async (message) => {
  try {
    const result = await store.dispatch(messagesApi.endpoints.sendMessage.initiate(message))
    if (result.error) {
      throw result.error
    }
    return result.data
  }
  catch (error) {
    if (isNetworkError(error)) {
      toast.error(i18n.t('errors.networkError'))
      throw error
    }
    else {
      toast.error(i18n.t('errors.messageSendError'))
    }
    throw error
  }
}

export { sendMessagesService }

/* На всякий случай */
// const getMessagesService = async () => {
//   try {
//     const result = await store.dispatch(messagesApi.endpoints.getMessages.initiate())
//     if (result.error) {
//       throw result.error
//     }
//     return result.data
//   }
//   catch (error) {
//     if (isNetworkError(error)) {
//       toast.error(i18n.t('errors.networkError'))
//       throw error
//     }
//     else {
//       toast.error(i18n.t('errors.messageSendError'))
//     }
//     throw error
//   }
// }
