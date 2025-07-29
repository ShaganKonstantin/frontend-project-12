import { useState, useEffect, useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../Contexts/AuthContext"

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [user, setUser] = useState(() => {
    const storedUsername = localStorage.getItem('Username');
    return storedUsername ? { username: storedUsername } : null;
  })
  const [token, setToken] = useState(() => {
    return localStorage.getItem('AuthorizationToken')
  })

  const login = useCallback((newToken, username) => {
    setToken(newToken);
    setUser({ username });
    localStorage.setItem('AuthorizationToken', newToken);
    localStorage.setItem('Username', username);
  }, [])

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('AuthorizationToken');
    localStorage.removeItem('Username');
    navigate('/login', { replace: true })
  }, [navigate])

  useEffect(() => {
    if (token && user?.username) {
      if (location.pathname === '/login' || location.pathname === '/signup') {
        navigate('/', { replace: true });
      }
    } else {
      localStorage.removeItem('AuthorizationToken');
      localStorage.removeItem('Username');
      
      const allowedRoutes = ['/login', '/signup'];

      if (!allowedRoutes.includes(location.pathname)) {
        navigate('/login', { replace: true });
      }
    }
  }, [token, user, navigate, location.pathname]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}