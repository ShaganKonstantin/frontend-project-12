import { channelsApi } from '../Slices/channelsApi'
import { store } from '../Store/chatStore'
import i18n from '../../utils/i18n/i18n'
import { toast } from 'react-toastify'

const isNetworkError = error => error?.status === 'FETCH_ERROR' || error?.error === 'TypeError'

const handleChannelServiceError = (error, customError) => {
  if (isNetworkError(error)) {
    toast.error(i18n.t('errors.networkError'))
  }
  else {
    toast.error(i18n.t(customError))
  }
  throw error
}

const addChannelService = async (channelName) => {
  try {
    const result = await store.dispatch(channelsApi.endpoints.addChannel.initiate({ name: channelName }))
    if (result.error) {
      throw result.error
    }
    toast.success(i18n.t('channelCreated'))
    return result.data
  }
  catch (error) {
    handleChannelServiceError(error, 'errors.channelAddError')
  }
}

const renameChannelService = async (id, newName) => {
  try {
    const result = await store.dispatch(channelsApi.endpoints.renameChannel.initiate({ id, name: newName }))
    if (result.error) {
      throw result.error
    }
    toast.success(i18n.t('channelRenamed'))
    return result.data
  }
  catch (error) {
    handleChannelServiceError(error, 'errors.channelRenameError')
  }
}

const removeChannelService = async (id) => {
  try {
    const result = await store.dispatch(channelsApi.endpoints.removeChannel.initiate(id))
    if (result.error) {
      throw result.error
    }
    toast.success(i18n.t('channelRemoved'))
    return result.data
  }
  catch (error) {
    handleChannelServiceError(error, 'errors.channelRemoveError')
    return null
  }
}

export { addChannelService, renameChannelService, removeChannelService }

/* Пусть будет на всякий случай, если придется использовать его в компоненте */
// const getChannelService = async () => {
//   try {
//     const result = await store.dispatch(channelsApi.endpoints.getChannels.initiate())
//     if (result.error) {
//       throw result.error
//     }
//     return result.data
//   }
//   catch (error) {
//     handleChannelServiceError(error, 'errors.channelsLoadError')
//   }
// }
