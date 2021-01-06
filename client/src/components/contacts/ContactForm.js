import React, { useState, useContext } from 'react';
import contactContext from '../../context/contacts/contactContext';

const ContactForm = () => {
    const contContext = useContext(contactContext);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    })

    const { name, email, phone, type } = contact;

    const onChange = e => {
        setContact({...contact, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        contContext.addContact(contact);
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
    }

    return (
        <form onSubmit={onSubmit} className='item-container'>
            <h2 className='contact-form-heading'>Add Contact</h2>
            <input className='contact-form-input' type='text' placeholder='Name' name='name' value={name} onChange={onChange}/>
            <input className='contact-form-input' type='text' placeholder='Email' name='email' value={email} onChange={onChange}/>
            <input className='contact-form-input' type='text' placeholder='Phone' name='phone' value={phone} onChange={onChange}/>
            <h5 className='contact-form-subheading'>Contact Type</h5>
            <div className='contact-form-radio-group'>
                <div className='contact-form-radio-container contact-form-radio-personal'><input type='radio' name='type' value='personal' checked={type === 'personal'} onChange={onChange}/> Personal{' '}</div>
                <div className='contact-form-radio-container contact-form-radio-professional'><input type='radio' name='type' value='professional' checked={type === 'professional'} onChange={onChange}/> Professional{' '}</div>
            </div>
            <div className='contact-form-button-container'>
                <input className='contact-form-button' type='submit' value='Add Contact' />
            </div>
        </form>
    )
}

export default ContactForm;
