import { channelModalSchema } from './validation.js';
import { useFormik } from 'formik';
import { useEffect, useState, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';

export const ChannelModal = ({ modal, closeModal, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: modal.channel?.name || ''
    },
    validationSchema: channelModalSchema,
    onSubmit: (values, actions) => {
      onSubmit(values, actions);
    },
    enableReinitialize: true, // чтобы форма подхватывала актуальное имя модалки, если открывается модалка для разных каналов
  });

  const inputRef = useRef(null);

  const getModalTitle = () => {
    switch(modal.type) {
      case 'add': 
        return 'Добавить канал';
      case 'rename':
        return 'Переименовать канал';
      case 'remove':
        return 'Удалить канал';
      default:
        return '';
    }
  };

  const getButtonStyle = () => {
    return modal.type === 'remove' ? 'danger' : 'primary';
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      };
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [closeModal]);

  useEffect(() => {
    if (modal.isOpen && inputRef.current && modal.type !== 'remove') {
      inputRef.current.focus();
    }
  }, [modal.isOpen, modal.type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modal.type === 'remove') {
      onSubmit({ id: modal.channel.id });
    } else {
      formik.handleSubmit();
    }
  }

  const handleClose = () => {
    formik.resetForm();
    closeModal();
  }

  if(!modal.isOpen) return null;

  return (
    <div className='modal fade show' tabIndex="-1" style={{ display: 'block' }}>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{getModalTitle()}</h5>
            <button 
              className='btn-close'
              type='button'
              onClick={handleClose}
              aria-label='Close'
            ></button>
          </div>
            <div className='modal-body'>
              {modal.type !== 'remove' ? (
                <form onSubmit={formik.handleSubmit}>
                  <input 
                    ref={inputRef}
                    type="text"
                    className={`form-control ${formik.errors.name && formik.touched.name ? 'is-invalid' : ''}`} 
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    name='name'
                    value={formik.values.name}
                    required
                    id='channelName'
                    aria-label='Имя канала'
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className='invalid-feedback'>{formik.errors.name}</div>
                  )}
                  <div className='d-flex justify-content-end mt-3'>
                    <button 
                      type='button' 
                      onClick={handleClose} 
                      className='btn btn-secondary me-2' 
                      disabled={formik.isSubmitting}>Отменить</button>
                    <button 
                      type='submit' 
                      className={`btn btn-${getButtonStyle()} me-2`} 
                      disabled={formik.isSubmitting || !formik.isValid}
                    >
                      {formik.isSubmitting ? 'Отправляется...' : 'Отправить'}
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <p className=''>Уверены?</p>
                  <div className='d-flex justify-content-end'>
                    <button 
                      type='button' 
                      onClick={handleClose} 
                      className='btn btn-secodary me-2'
                    >
                      Отменить
                    </button>
                    <button 
                      type='button' 
                      onClick={handleSubmit} 
                      className='btn btn-danger me-2'>Удалить</button>
                  </div>
                </div>
              )}
            </div>
          
        </div>
      </div>
    </div>
  );
};

export const ChannelDropdown = ({ channel, onRemove, onRename, isActive, onClick }) => {
  const [showMenu, setShowMenu] = useState(false);
  const showDropdown = channel.removable === true;

  return (
    <div className='d-flex align-items-center w-100'>
      <button 
        className={`btn w-100 text-start text-truncate ${isActive ? 'btn-secondary' : 'btn-light'}`}
        onClick={onClick}
        aria-label={`Перейти в канал ${channel.name}`}
      >
        <span># {channel.name}</span>
      </button>
      {/*Кнопка для редактируемых каналов*/}
      {showDropdown && (
        <Dropdown
          show={showMenu}
          onToggle={(isOpen) => setShowMenu(isOpen)}
        >
          <Dropdown.Toggle
            split
            variant={isActive ? 'secondary' : 'light'}
            className='dropdown-toggle-split'
            aria-label='Управление каналом'
          >
            <span className='visually-hidden'>Меню канала</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={(e) => {
                e.stopPropagation();
                onRename(channel);
              }}
              aria-label={`Переименовать канал ${channel.name}`}
            >
              Переименовать
            </Dropdown.Item>

            <Dropdown.Item
              onClick={(e) => {
                e.stopPropagation();
                onRemove(channel);
              }}
              aria-label={`Удалить канал ${channel.name}`}
            >
              Удалить
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
};
