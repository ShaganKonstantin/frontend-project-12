import { channelsApi } from '../Slices/channelsApi'
import { store } from '../Store/chatStore'
import i18n from '../../utils/i18n/i18n'
import { toast } from 'react-toastify'

const isNetworkError = error => error?.status === 'FETCH_ERROR' || error?.error === 'TypeError'

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
    if (isNetworkError(error)) {
      toast.error(i18n.t('errors.networkError'))
    }
    else {
      // Другие ошибки будут обработаны в transformErrorResponse
      console.error('Channel add error:', error)
    }
    throw error
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
    if (isNetworkError(error)) {
      toast.error(i18n.t('errors.networkError'))
    }
    else {
      console.error('Channel rename error:', error)
    }
    throw error
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
    if (isNetworkError(error)) {
      toast.error(i18n.t('errors.networkError'))
    }
    else {
      console.error('Channel remove error:', error)
    }
    throw error
  }
}

export { addChannelService, renameChannelService, removeChannelService }
