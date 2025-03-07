import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Header: FC = () => {
    return (
        <header className="py-2 px-3 bg-primary text-white">
            <h1>
                <Link to="/" className="text-white text-decoration-none">
                    Recipes App
                </Link>
            </h1>
        </header>
    );
}

export default Header;