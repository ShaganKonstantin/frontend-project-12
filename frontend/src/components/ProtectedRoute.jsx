import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Hooks";
import { useEffect } from "react";

export const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { token } = useAuth();
    
    useEffect(() => {
        if (!token) {
            navigate('/login', {state: {from: location.pathname}, replace: true});
        }
    }, [token, location.pathname, navigate])

    if (!token) {
        return null;
    }
  
    return children;
}

//если есть токен, показывает дочерние компоненты.