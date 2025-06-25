import { io } from 'socket.io-client';

export const createSocket = (token, username) => {
  const socket = io('http://localhost:5001', {
    auth: {
      token,
      username,
    },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ['websocket']
  });

  socket.on('connect', () => {
    console.log('Connected to WebSocket')
  })

  socket.on('connect_error', (err) => {
    console.error('Ошибка подключения к WebSocket', err);
  });

  socket.on('reconnection_attempt', () => {
    console.error('Ошибка переподключения к WebSocket')
  })

  return socket;
}