import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './Hooks/useAuth'

export const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
