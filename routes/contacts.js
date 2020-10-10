const express = require('express');
const router = express.Router();

// @route   GET api/users
// @desc    Get all user contacts
// @access  Private
router.get('/', (req, res) => {
    res.send('Get all contacts');
});

// @route   POST api/users
// @desc    Add a contact
// @access  Private
router.post('/', (req, res) => {
    res.send('Create a contact');
});

// @route   PUT api/users/:id
// @desc    Update a contact
// @access  Private
router.put('/:id', (req, res) => {
    res.send('Update a specific contact');
});

// @route   DELETE api/users/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', (req, res) => {
    res.send('Delete a specific contact');
});

module.exports = router;