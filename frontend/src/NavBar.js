import React from 'react'
import { Link } from 'react-router-dom';
import "./NavBar.css"


function NavBar({ LogOut, currentUser }) {
    return (
        <nav>

            <Link id="logo" to="/">
                {'< '}Shared{" >"}
            </Link>
            <div className="left-button">
                {currentUser
                    ?
                    <>
                        <Link id="profile" to="/profile">{currentUser.username}</Link>
                        <Link id="logout" to="/" onClick={LogOut}>Log Out</Link>
                    </>
                    :
                    <>
                        <Link id="login" to="/login">Log in</Link>
                        <Link id="signup" to="/signup">Sign Up</Link>
                    </>
                }

            </div>

        </nav >
    );
}

export default NavBar