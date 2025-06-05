import { useNavigate } from "react-router-dom";
import { useAuth } from "./Hooks";

export const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();

    const { token } = useAuth();
    
    if (!token) {
        navigate('/login', {state: {from: location, replace: true}});
        return null; //т.к. работа navigate() происходит асинхронно, то надо возвращать null, чтобы прервать текущий рендер.
    }

    return children;
}

//если есть токен, показывает дочерние компоненты.