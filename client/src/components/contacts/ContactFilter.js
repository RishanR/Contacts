import React, { useContext, useRef, useEffect } from 'react'
import contactContext from '../../context/contacts/contactContext';

const ContactFilter = () => {
    const contContext = useContext(contactContext);

    const { filterContacts, clearFilter, filtered } = contContext;

    const text = useRef();

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    });

    const onChange = e => {
        if (text.current.value !== '') {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    }

    return (
        <form className='filter-container'>
            <input className='filter-input' ref={text} type='text' placeholder='Filter Contacts...' onChange={onChange}></input>
        </form>
    )
}

export default ContactFilter;
