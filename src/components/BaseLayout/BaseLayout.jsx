import React from 'react';
import { Link } from "react-router-dom";
import './style.css';

const BaseLayout = ({ children }) => {
    return (
        <>
            <header className="header">
                <div className="container">
                    <nav className="nav">
                        <Link to="/" className="nav-item">Tengri News</Link>
                        <Link to="/clone-news" className="nav-item">CTengri News</Link>
                    </nav>
                </div>
            </header>
            <main className="main-content">
                <div className="container">
                    {children}
                </div>
            </main>
        </>
    );
};

export default BaseLayout;
