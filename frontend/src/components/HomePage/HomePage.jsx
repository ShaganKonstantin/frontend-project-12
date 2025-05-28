import React from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('AuthorizationToken');
        navigate('/login')
    }

    return (
        <div className="h-100">
            <div className="h-100" id="chat">
                <div className="d-flex flex-column h-100">
                    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                        <div className="container">
                            <a className="navbar-brand" href="/">Hexlet Chat</a>
                            <button onClick={handleLogout} className="btn btn-primary" type="button">Выйти</button>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}