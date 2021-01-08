import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contacts/contactContext';

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);


    const { isAuthenticated, logout, user } = authContext;
    const { clearContacts } = contactContext;

    const onLogout = () => {
        logout();
        clearContacts();
    }

    const authLinks = (
        <Fragment>
            <div className="navbar-item-no-click">
                Hello  { user && user.name }
            </div>
            <div onClick={onLogout} className="navbar-item">
                <i className='fas fa-sign-out-alt'> <span className='navbar-text'> Logout</span></i>
            </div>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <Link to="/register" className="navbar-item">
                Register
            </Link>

            <Link to="/login" className="navbar-item">
                Login
            </Link>
        </Fragment>
    )

    return (
        <div className="navbar">
            <div className="left-container">
                <Link to="/" className="logo">
                        
                        <i className={icon} /> {title}
                        
                </Link>
            </div> 
            <div className="right-container">
                {isAuthenticated ? authLinks : guestLinks}
                
            </div>  
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: "Contacts",
    icon: "fas fa-id-card-alt"
}

export default Navbar