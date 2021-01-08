import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import contactContext from '../../context/contacts/contactContext';

const ContactItem = ({ contact }) => {
    const { _id, name, email, phone, type } = contact;

    const contContext = useContext(contactContext);

    const { deleteContact, setCurrent, clearCurrent } = contContext;

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }

    return (
        <div className='item-container'>
            <h3 className={`item-text ${(type === 'professional') ? 'item-text-separator-orange' : 'item-text-separator-red'}`}>
                {name}<span style={{float: 'right'}} className={`item-badge ${(type === 'professional') ? 'item-badge-orange' : 'item-badge-red'}`}>
                {type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </h3>
            <div className='item-list-button-container'>
                <ul className='item-list'>
                    {email && <li className='item-list-bullet'>
                            <i className='fas fa-envelope-open item-list-icon'></i>{email}
                        </li>}
                    {phone && <li className='item-list-bullet'>
                        <i className='fas fa-phone item-list-icon'></i>{phone}
                    </li>}
                </ul>
                <p className='item-edit-delete-group'>
                    <button onClick={() => setCurrent(contact)} className='fas fa-edit item-button item-edit'></button>
                    <button onClick={onDelete} className='fas fa-trash item-button item-delete'></button>
                </p>
            </div>
            
        </div>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItem;