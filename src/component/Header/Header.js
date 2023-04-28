import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    const token = window.localStorage.getItem("token");

    return (
        <header className='head'>
            <div className='header'>
                <div className='logo'>
                    <Link to='/'>SUMIT</Link>
                </div>
                <nav className='navigation'>
                    <Link to='/'>Home</Link>
                   {!token && <Link to='/Registration'>Registration</Link>}
                    <Link to='/UserInfo'>UserInfo</Link>
                    {!token && <Link to='/Login'>Login</Link>}
                    <Link to='/Login'>LogOut</Link>
                </nav>
            </div>

        </header>
    )
}

export default Header