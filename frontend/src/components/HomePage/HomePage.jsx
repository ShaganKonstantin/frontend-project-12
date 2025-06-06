import React, { useState } from "react";
import { useAuth } from "../Hooks";
import { useGetChannelsQuery, useGetMessagesQuery } from "../Slices/ApiSlice";

export const HomePage = () => {
    const { logout, token } = useAuth();

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

    const [currentChannelId, setCurrentChannelId] = useState(null);

    const messageToMatchChannel = messages.filter((message) => message.channelId === currentChannelId)


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
                </div>
            </div>
        </div>
    )
}