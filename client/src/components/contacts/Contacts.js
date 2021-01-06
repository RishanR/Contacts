import React, {Fragment, useContext} from 'react'
import ContactContext from '../../context/contacts/contactContext';
import ContactItem from './ContactItem'

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const { contacts } = contactContext;

    return (
        <div>
            {contacts.map(contact => <ContactItem key={contact.id} contact={contact} />)}
        </div>
    )
}

export default Contacts;
