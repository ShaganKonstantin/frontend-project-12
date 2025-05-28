import React from "react";
import { useLocation, Navigate } from "react-router-dom";

export const ProtectedRoute = ({children}) => {
    const location = useLocation();
    const token = localStorage.getItem('AuthorizationToken');
    
    if (!token) {
        return <Navigate to="/login" state={{from: location}} replace/>
    }

    return children;
}