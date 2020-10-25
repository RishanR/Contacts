const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Content = require('../models/Contact');
const Contact = require('../models/Contact');

// @route   GET api/users
// @desc    Get all user contacts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 })
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error')
    }
});

// @route   POST api/users
// @desc    Add a contact
// @access  Private
router.post('/', [ auth, [
    check('name', 'Please input a name!')
        .not()
        .isEmpty(),
    check('email', 'Please input an email')
        .isEmail()
]], async (req, res) => {

    // Check if there are any errors in the validation
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {

        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();

        res.json(contact);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
});

// @route   PUT api/users/:id
// @desc    Update a contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;

    // Build a contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        // Check if contact exists
        if (!contact) {
            return res.status(404).json({ msg: 'Contact was not found'})
        }

        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized'})
        }

        // Update contact fields
        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields },
            { new: true});

        res.json(contact);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
});

// @route   DELETE api/users/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        // Check if contact exists
        if (!contact) {
            return res.status(404).json({ msg: 'Contact was not found' });
        }

        // Make sure user owns contact
        if (req.user.id !== contact.user.toString()) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Contact.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Contact Removed' });

    } catch (err){
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;