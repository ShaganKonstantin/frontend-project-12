import React from "react";
import { useAuth } from "../Hooks";

export const HomePage = () => {
    const { logout } = useAuth();

    return (
        <div className="h-100">
            <div className="h-100" id="chat">
                <div className="d-flex flex-column h-100">
                    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                        <div className="container">
                            <a className="navbar-brand" href="/">Hexlet Chat</a>
                            <button onClick={logout} className="btn btn-primary" type="button">Выйти</button>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}