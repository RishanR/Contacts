import React, {Fragment, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactContext from '../../context/contacts/contactContext';
import ContactItem from './ContactItem'
import Spinner from '../layout/Spinner'

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const { contacts, filtered, getContacts, loading } = contactContext;

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, [])

    if (contacts !== null && contacts.length === 0 && !loading) {
        return <h4 className='contacts-zero-message'>Please add a contact.</h4>
    }

    return (
        <div className='contacts-scroll-container'>
            {contacts !== null && !loading ? (filtered !== null 
                ? filtered.map(contact => (
                        <motion.div key={contact._id} layout initial={{opacity: 0}} animate={{opacity: 1}}>
                            <ContactItem contact={contact} />
                        </motion.div>
                )) 
                
                : contacts.map(contact => (
                        <motion.div key={contact._id} layout initial={{opacity: 0}} animate={{opacity: 1}}>
                            <ContactItem contact={contact} />
                        </motion.div>
                ))
            ) : <Spinner />}
            
        </div>
    )
}

export default Contacts;
