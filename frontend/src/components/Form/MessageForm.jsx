import { useRef, useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import { useSendMessageMutation } from "../Slices/ApiSlice";


export const MessageForm = ({ channelId }) => {
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const [sendMessage] = useSendMessageMutation();
  const { user } = useAuth();
        
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('хэндлер вызывается');
    console.log('text:', text);
    console.log('channelId:', channelId);
    console.log('user:', user);
    if (text && channelId && user?.username) {
      console.log('sendMessage', { text, channelId, username: user.username });
      try {
        await sendMessage({
          body: text, 
          channelId,
          username: user.username
        }).unwrap();
          setText('');
          inputRef.current?.focus();
      } catch(error) {
        console.error('Ошибка отправки сообщения', error);
        }
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input ref={inputRef} type="text" className="border-0 p-0 ps-2 form-control" value={text} onChange={(e) => setText(e.target.value)} placeholder="Введите сообщение..." />
          <button type="submit" className="btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
            </svg>
            <span className="visually-hidden">Отправить</span>
          </button>
        </div>
      </form>
      )
    }