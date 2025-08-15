import { useContext } from 'react'
import { SocketContext } from '../Contexts/SocketContext'

export const useSocket = () => useContext(SocketContext)
