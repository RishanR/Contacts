import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = () => {
    let history = useHistory();
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;

    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect (() => {
        if (isAuthenticated) {
            history.push('/');
        }
        if (error === 'Invalid Credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, history])

    const [user, setUser] = useState({
        email:'',
        password:''
    })
    
    const { email, password } = user;

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please fill in all fields', 'danger');
        } else {
            login({
                email,
                password
            })
        }
    }

    return (
        <div className='auth-container'>
            <div className='item-container'>
                <h1 className='contact-form-heading heading-orange'>
                    Login
                </h1>
                <form onSubmit={onSubmit} >
                    <div className='login-form-group'>
                        <label className='auth-label' htmlFor='email'>Email</label>
                        <input className='contact-form-input' type='email' name='email' value={email} onChange={onChange} required/>
                    </div>

                    <div className='login-form-group'>
                        <label className='auth-label' htmlFor='password'>Password</label>
                        <input className='contact-form-input' type='password' name='password' value={password} onChange={onChange} required/>
                    </div>

                    <input type='submit' value='Login' className='contact-form-button auth-button-orange' />
                </form>
            </div>
        </div>
    )
}

export default Login;
