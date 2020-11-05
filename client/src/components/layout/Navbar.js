import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ title, icon }) => {
    return (
        <div className="navbar">
            <div className="left-container">
                <Link to="/" className="logo">
                        
                        <i className={icon} /> {title}
                        
                </Link>
            </div> 
            <div className="right-container">
                <Link to="/about" className="navbar-item">
                    About
                </Link>

                <Link to="#" className="navbar-item">
                    Login
                </Link>
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