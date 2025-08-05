import React, { useState, useEffect } from "react";
import { useAuth } from "../Hooks/useAuth";
import { 
    useGetChannelsQuery, 
    useGetMessagesQuery, 
    useSubscribeToMessagesQuery, 
    useAddChannelMutation, 
    useRenameChannelMutation,
    useRemoveChannelMutation, 
} from "../Slices/ApiSlice";
import { MessageForm } from "../Form/MessageForm";
import { useChannelModal } from "../Hooks/useChannelModal";
import { ChannelDropdown, ChannelModal } from "../channelModal/channelModal";
import { useTranslation } from "react-i18next";

export const HomePage = () => {
    const { logout, token } = useAuth();
    const [currentChannelId, setCurrentChannelId] = useState(null);
    const { modal, openModal, closeModal } = useChannelModal();
    const [addChannel] = useAddChannelMutation();
    const [renameChannel] = useRenameChannelMutation();
    const [removeChannel] = useRemoveChannelMutation();
    const { t } = useTranslation();

    const handleAddChannel = () => {
        console.log('Кнопка работает')
        openModal('add')
    }
    const handleRenameChannel = (channel) => openModal('rename', channel);
    const handleRemoveChannel = (channel) => openModal('remove', channel);

    const handleSubmit = async (values, actions) => {
    console.log('Submitting with values:', values);
        try {
            if (modal.type === 'add') {
             const response = await addChannel({ name: values.name }).unwrap();
             if (response && response.id) {
                setCurrentChannelId(response.id);
                if (actions?.resetForm) actions.resetForm();
             }
            } else if (modal.type === 'rename') {
                await renameChannel({ id: modal.channel.id, name: values.name }).unwrap();
            } else if (modal.type === 'remove') {
                await removeChannel(modal.channel.id).unwrap();
                const generalChannel = channels.find((channel) => channel.name === 'general');
                if (generalChannel) {
                    setCurrentChannelId(generalChannel.id);
                }
            }
            closeModal();
        } catch (error) {
            console.error('Ошибка', error);
            const errorMessage = error.data?.message || t('saveChError');
            if (actions?.setErrors) {
            actions.setErrors({ name: errorMessage });
            }
        } finally {
            if (actions?.setSubmitting) {
            actions.setSubmitting(false);
            }
        }
    }

    const {
        data: channels = [],
        isLoading: isChannelsLoading,
        error: channelsError,
    } = useGetChannelsQuery(undefined, { skip: !token });

    const {
        data: messages = [],
        isLoading: isMessagesLoading,
        error: messagesError,
    } = useGetMessagesQuery(undefined, { skip: !token });

    useSubscribeToMessagesQuery();

    useEffect(() => {
        if (channels.length > 0 && !currentChannelId) {
            const generalChannel = channels.find(c => c.name === 'general');
            if (generalChannel) {
                setCurrentChannelId(generalChannel.id);
            }
        }
    }, [channels, currentChannelId]);

    const messageToMatchChannel = messages.filter((message) => message.channelId === currentChannelId);

    if (isChannelsLoading || isMessagesLoading) {
        return <div className="text-center mt-5">Загрузка...</div>;
      }
    
      if (channelsError || messagesError) {
        return <div className="text-center mt-5">Ошибка загрузки данных</div>;
      }

    return (
        <div className="h-100">
            <div className="h-100" id="chat">
                <div className="d-flex flex-column vh-100">
                    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                        <div className="container">
                            <a className="navbar-brand" href="/">Hexlet Chat</a>
                            <button onClick={logout} className="btn btn-primary" type="button">{t('logoutButton')}</button>
                        </div>
                    </nav>
                    <div className="container h-100 my-4 overflow-hidden rounded shadow">
                        <div className="row h-100 bg-white flex-md-row d-flex" style={{ minWidth: 0 }}>
                            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                                <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                                    <b>{t('channels')}</b>
                                    <button  
                                        onClick={handleAddChannel} 
                                        className="p-0 text-primary btn btn-group-vertical" 
                                        type="button" 
                                        aria-label="Добавить канал"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square">
                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                                        </svg>
                                        <span className="visually-hidden">+</span>
                                    </button>
                                </div>
                                <ul 
                                    id="channels-box" 
                                    className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
                                    aria-label="Список каналов"
                                >
                                    {channels.map((channel) => (
                                        <li key={channel.id} className="nav-item w-100">
                                            <ChannelDropdown 
                                                channel={channel}
                                                isActive={channel.id === currentChannelId}
                                                onRename={handleRenameChannel}
                                                onRemove={handleRemoveChannel}
                                                onClick={() => setCurrentChannelId(channel.id)}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col p-0 h-100 d-flex flex-column" style={{ minWidth: 0 }}>
                                <div className="d-flex flex-column h-100" style={{ minWidth: 0 }}>
                                    {/*Заголовок канала*/}
                                    <div className="bg-light mb-4 p-3 shadow-sm small" style={{ flexShrink: 0 }}>
                                    <p className="m-0 text-truncate">
                                        <b className="m-0"># {channels.find((c) => c.id === currentChannelId)?.name}</b>
                                    </p>
                                    </div>

                                    {/*Сообщения*/}
                                    <div className="flex-grow-1 overflow-auto bg-white p-3">
                                    {messageToMatchChannel.map((message) => (
                                        <div key={message.id} className="mb-3 text-break">
                                        <strong>{message.username}: </strong> {message.body}
                                        </div>
                                    ))}
                                    </div>

                                    {/*Форма ввода*/}
                                    <div className="p-3 border-top bg-white" style={{ flexShrink: 0 }}>
                                    <MessageForm channelId={currentChannelId}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ChannelModal 
                modal={modal} 
                closeModal={closeModal} 
                onSubmit={handleSubmit}
            />
        </div>
    );
};