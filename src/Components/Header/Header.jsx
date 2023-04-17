import React from 'react';
import './Header.css'
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <nav className='d-flex bg-primary justify-content-center py-3 container'>
            <Link className='nav-link mx-3 fw-semibold text-white' to='/'>Home</Link>
            <Link className='nav-link mx-3 fw-semibold text-white' to='/login'>Login</Link>
            <Link className='nav-link mx-3 fw-semibold text-white' to='/register'>Register</Link>
        </nav>
    );
};

export default Header;