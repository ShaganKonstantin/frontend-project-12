import { useImmer } from 'use-immer';

export const useChannelModal = () => {
  const [modal, updateModal] = useImmer({
    isOpen: false,
    type: null, // add, rename, remove
    channel: null, // { id, name, removable }
    error: null,
  });

  const openModal = (type, channel = null) => {
    updateModal(draft => {
      draft.isOpen = true;
      draft.type = type;
      draft.channel = channel;
      draft.error = null;
    })
  };

  const closeModal = () => {
    updateModal(draft => {
      draft.isOpen = false;
      draft.type = null;
      draft.channel = null;
      draft.error = null;
    })
  };

  const setError = (error) => {
    updateModal(draft => {
      draft.error = error;
    })
  };

  return {
    modal,
    updateModal,
    openModal,
    closeModal,
    setError,
  };
}