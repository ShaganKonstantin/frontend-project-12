import { useState, useEffect } from 'react'
import { useAuth } from '../Hooks/useAuth'
import { createSocket } from '../WebSocket/webSocket'
import { SocketContext } from '../Contexts/SocketContext'

export const SocketProvider = ({ children }) => {
  const auth = useAuth()
  const [socket, setSocket] = useState()

  useEffect(() => {
    if (auth?.token && auth?.user?.username) {
      const newSocket = createSocket(auth?.token, auth?.user?.username)
      setSocket(newSocket)

      return () => {
        newSocket.disconnect()
      }
    }
  }, [auth?.token, auth?.user?.username])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
