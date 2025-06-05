import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts";
import { useEffect, useState } from "react";

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => {
        const storedToken = localStorage.getItem('AutorizationToken');
        return storedToken ? JSON.parse(storedToken) : null;
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem('AuthorizationToken', JSON.stringify(token))
        } else {
            localStorage.removeItem('AuthorizationToken')
        }
    }, [token])

    const login = (newToken) => {
        setToken(newToken);
        navigate('/')
    };

    const logout = () => {
        setToken(null);
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{user, login, logout, token}}>
            {children}
        </AuthContext.Provider>
    )
}
