import React, { useState, useContext, useEffect } from 'react';
import contactContext from '../../context/contacts/contactContext';

const ContactForm = () => {
    const contContext = useContext(contactContext);

    const { addContact, updateContact, clearCurrent, current } = contContext;

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setTimeout(() => {console.log(current)}, 5000);
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [contContext, current])

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

    const clearAll = () => {
        clearCurrent();
    }

    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            addContact(contact);
        } else {
            updateContact(contact);
        }
        clearAll();
    }

    return (
        <form onSubmit={onSubmit} className='item-container'>
            <h2 className='contact-form-heading'>{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input className='contact-form-input' type='text' placeholder='Name' name='name' value={name} onChange={onChange}/>
            <input className='contact-form-input' type='text' placeholder='Email' name='email' value={email} onChange={onChange}/>
            <input className='contact-form-input' type='text' placeholder='Phone' name='phone' value={phone} onChange={onChange}/>
            <h5 className='contact-form-subheading'>Contact Type</h5>
            <div className='contact-form-radio-group'>
                <div className='contact-form-radio-container contact-form-radio-personal'><input type='radio' name='type' value='personal' checked={type === 'personal'} onChange={onChange}/> Personal{' '}</div>
                <div className='contact-form-radio-container contact-form-radio-professional'><input type='radio' name='type' value='professional' checked={type === 'professional'} onChange={onChange}/> Professional{' '}</div>
            </div>
            <div className='contact-form-button-container'>
                <input className='contact-form-button emphasize-button' type='submit' value={current ? 'Update' : 'Add'} />
            </div>
            {current && <div>
                    <button className='contact-form-button subtle-button' onClick={clearAll}>Clear</button>
                </div>}
        </form>
    )
}

export default ContactForm;
