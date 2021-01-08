import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'


const Register = () => {
    let history = useHistory();
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;

    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect (() => {
        if (isAuthenticated) {
            history.push('/');
        }
        if (error === 'User already exists') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, history])

    const [user, setUser] = useState({
        name:'',
        email:'',
        password:'',
        passwordConfirm:''
    })
    
    const { name, email, password, passwordConfirm } = user;

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('Please enter all fields', 'danger');
        } else if (password !== passwordConfirm){
            setAlert('Passwords do not match', 'danger');
        } else {
            register({
                name,
                email,
                password
            })
        }
    }

    return (
        <div className='auth-container'>
            <div className='item-container'>
                <h1 className='contact-form-heading heading-red'>
                    Register
                </h1>
                <form onSubmit={onSubmit} >
                    <div className='login-form-group'>
                        <label className='auth-label' htmlFor='name'>Name</label>
                        <input className='contact-form-input' type='text' name='name' value={name} onChange={onChange} required/>
                    </div>

                    <div className='login-form-group'>
                        <label className='auth-label' htmlFor='email'>Email</label>
                        <input className='contact-form-input' type='email' name='email' value={email} onChange={onChange} required/>
                    </div>

                    <div className='login-form-group'>
                        <label className='auth-label' htmlFor='password'>Password</label>
                        <input className='contact-form-input' type='password' name='password' value={password} onChange={onChange} minLength="6" required/>
                    </div>

                    <div className='login-form-group'>
                        <label className='auth-label' htmlFor='passwordConfirm'>Confirm Password</label>
                        <input className='contact-form-input' type='password' name='passwordConfirm' value={passwordConfirm} onChange={onChange} required/>
                    </div>

                    <input type='submit' value='Register' className='contact-form-button auth-button-red' />
                </form>
            </div>
        </div>
    )
}

export default Register;
