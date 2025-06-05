import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts";
import { useEffect, useState } from "react";

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('AuthorizationToken');
        return storedToken ? JSON.parse(storedToken) : null;
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem('AuthorizationToken', JSON.stringify(token));

            if (location.pathname === '/login') {
                navigate('/', { replace: true })
            }
        } else {
            localStorage.removeItem('AuthorizationToken')
        }
    }, [token, navigate, location.pathname])

    const login = (newToken) => {
        setToken(newToken);
    };

    const logout = () => {
        setToken(null);
    }

    useEffect(() => {
        if (!token && location.pathname !== '/login') {
            navigate('/login', { replace: true })
        } 
    }, [token, navigate, location.pathname])

    return (
        <AuthContext.Provider value={{user, login, logout, token}}>
            {children}
        </AuthContext.Provider>
    )
}
