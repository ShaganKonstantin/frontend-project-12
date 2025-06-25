import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts";
import { useEffect, useState } from "react";

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => {
        return localStorage.getItem('AuthorizationToken');
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem('AuthorizationToken', token);

            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser({ username: payload.username });
            } catch(e) {
                console.error('Ошибка декодирования токена', e);
            }

            if (location.pathname === '/login') {
                navigate('/', { replace: true })
            }
        } else {
            localStorage.removeItem('AuthorizationToken');
            if (location.pathname !== '/login') {
              navigate('/login');
            }
        }
    }, [token, navigate, location.pathname])

    const login = (newToken) => {
        setToken(newToken);
    };

    const logout = () => {
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{user, login, logout, token}}>
            {children}
        </AuthContext.Provider>
    )
}
