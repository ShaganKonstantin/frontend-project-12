import React, { useState, useEffect } from "react";
import { useAuth } from "../Hooks/useAuth";
import { useGetChannelsQuery, useGetMessagesQuery, useSubscribeToMessagesQuery } from "../Slices/ApiSlice";
import { MessageForm } from "../Form/MessageForm";

export const HomePage = () => {
    const { logout, token } = useAuth();
    const [currentChannelId, setCurrentChannelId] = useState(null);

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
                <div className="d-flex flex-column h-100">
                    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                        <div className="container">
                            <a className="navbar-brand" href="/">Hexlet Chat</a>
                            <button onClick={logout} className="btn btn-primary" type="button">Выйти</button>
                        </div>
                    </nav>
                    <div className="container h-100 my-4 overflow-hidden rounded shadow">
                        <div className="row h-100 bg-white flex-md-row d-flex">
                            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                                <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                                    <b>Каналы</b>
                                    <button className="p-0 text-primary btn btn-group-vertical" type="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square">
                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                                        </svg>
                                        <span className="visually-hidden">+</span>
                                    </button>
                                </div>
                                <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                                    {channels.map((channel) => (
                                        <li key={channel.id} className="nav-item w-100" onClick={() => setCurrentChannelId(channel.id)}>
                                            <button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
                                                <span className="me-1">#</span> {channel.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col p-0 h-100">
                                <div className="d-flex flex-column h-100">
                                    <div className="bg-light mb-4 p-3 shadow-sm small">
                                            {currentChannelId ? (
                                                <>
                                                    <p className="m-0">
                                                        <b className="m-0">#{channels.find((c) => c.id === currentChannelId)?.name}</b>
                                                    </p>
                                                    <div className="flex-grow-1 overflow-auto p-3">
                                                        {messageToMatchChannel.map((message) => (
                                                            <div key={message.id} id={message.id} className="mb-3">
                                                                <strong>{message.username} : </strong> {message.body}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="p-3 border-top">
                                                        <MessageForm channelId={currentChannelId}/>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center mt-5">Выберите канал для общения</div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};