import React from 'react';
import { Link } from "react-router-dom";

const Header = ({ onSearch }) => {
    return (
        <header>
            <nav>
                <Link to="/">Tengri News</Link>
                <Link to="/clone-news">CTengri News</Link>
                <input
                    type="text"
                    placeholder="Поиск новостей..."
                    onChange={(e) => onSearch(e.target.value)}
                />
            </nav>
        </header>
    );
};

export default Header;
