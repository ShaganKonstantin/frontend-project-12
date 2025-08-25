import { channelModalSchema } from './validation.js'
import { useFormik } from 'formik'
import { useEffect, useState, useRef } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

export const ChannelModal = ({ modal, closeModal, onSubmit }) => {
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      name: modal.channel?.name || '',
    },
    validationSchema: channelModalSchema,
    onSubmit: async (values) => {
      await onSubmit(values)
    },
    enableReinitialize: true, // чтобы форма подхватывала актуальное имя модалки, если открывается модалка для разных каналов
  })

  const inputRef = useRef(null)

  const getModalTitle = () => {
    switch (modal.type) {
      case 'add':
        return t('modalAddChTitle')
      case 'rename':
        return t('modalRenameChTitle')
      case 'remove':
        return t('modalDeleteChTitle')
      default:
        return ''
    }
  }

  const getButtonStyle = () => {
    return modal.type === 'remove' ? 'danger' : 'primary'
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      };
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [closeModal])

  useEffect(() => {
    if (modal.isOpen && inputRef.current && modal.type !== 'remove') {
      inputRef.current.focus()
    }
  }, [modal.isOpen, modal.type])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (modal.type === 'remove') {
      try {
        await onSubmit({ id: modal.channel.id })
        handleClose()
      }
      catch (error) {
        toast.error(t('toastError') || error.message)
      }
    }
    else {
      await formik.submitForm()
      if (Object.keys(formik.errors).length === 0) { // Закрыть модалку только после валидации 
        handleClose()
      }
    }
  }

  const handleClose = () => {
    formik.resetForm()
    closeModal()
  }

  if (!modal.isOpen) return null

  return (
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{getModalTitle()}</h5>
            <button
              className="btn-close"
              type="button"
              onClick={handleClose}
              aria-label="Close"
            >
            </button>
          </div>
          <div className="modal-body">
            {modal.type !== 'remove'
              ? (
                  <form onSubmit={handleSubmit}>
                    <input
                      ref={inputRef}
                      type="text"
                      className={`form-control ${formik.errors.name && formik.touched.name ? 'is-invalid' : ''}`}
                      onChange={formik.handleChange}
                      disabled={formik.isSubmitting}
                      name="name"
                      value={formik.values.name}
                      required
                      id="channelName"
                      aria-label={t('channelName')}
                    />
                    <label htmlFor="channelName" className="visually-hidden">{t('channelName')}</label>
                    {formik.touched.name && formik.errors.name && (
                      <div className="invalid-feedback">{formik.errors.name}</div>
                    )}
                    <div className="d-flex justify-content-end mt-3">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="btn btn-secondary me-2"
                        disabled={formik.isSubmitting}
                      >
                        {t('modalCancelButton')}
                      </button>
                      <button
                        type="submit"
                        className={`btn btn-${getButtonStyle()} me-2`}
                        disabled={formik.isSubmitting}
                      >
                        {formik.isSubmitting ? t('modalSendingButton') : t('modalSendButton')}
                      </button>
                    </div>
                  </form>
                )
              : (
                  <div>
                    <p className="">{t('modalDeleteChConfirmation')}</p>
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="btn btn-secondary me-2"
                      >
                        {t('modalCancelButton')}
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-danger me-2"
                      >
                        {t('modalDeleteChButton')}
                      </button>
                    </div>
                  </div>
                )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const ChannelDropdown = ({ channel, onRemove, onRename, isActive, onClick }) => {
  const [showMenu, setShowMenu] = useState(false)
  const showDropdown = channel.removable === true

  const { t } = useTranslation()

  return (
    <div className="d-flex align-items-center w-100">
      <button
        className={`btn w-100 text-start text-truncate ${isActive ? 'btn-secondary' : 'btn-light'}`}
        onClick={onClick}
        aria-label={`Перейти в канал ${channel.name}`}
      >
        <span>
          #
          {channel.name}
        </span>
      </button>
      {/* Кнопка для редактируемых каналов */}
      {showDropdown && (
        <Dropdown
          show={showMenu}
          onToggle={isOpen => setShowMenu(isOpen)}
        >
          <Dropdown.Toggle
            split
            variant={isActive ? 'secondary' : 'light'}
            className="dropdown-toggle-split"
            aria-label="Управление каналом"
          >
            <span className="visually-hidden">{t('channelMenu')}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={(e) => {
                e.stopPropagation()
                onRename(channel)
              }}
              aria-label="Переименовать"
              // aria-label={`Переименовать канал ${channel.name}`}
            >
              {t('modalRenameChTitle')}
            </Dropdown.Item>

            <Dropdown.Item
              onClick={(e) => {
                e.stopPropagation()
                onRemove(channel)
              }}
              aria-label="Удалить"
            >
              {t('dropdownDelete')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  )
}
