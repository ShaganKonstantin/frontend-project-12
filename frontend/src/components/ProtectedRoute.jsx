import { useLocation, useNavigate } from "react-router-dom";

export const ProtectedRoute = ({children}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const token = localStorage.getItem('AuthorizationToken');
    
    if (!token) {
        navigate('/login', {state: {from: location, replace: true}});
        return null; //т.к. работа navigate() происходит асинхронно, то надо возвращать null, чтобы прервать текущий рендер.
    }

    return children;
}

//если есть токен, показывает дочерние компоненты.