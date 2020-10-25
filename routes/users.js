const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')

const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [
    // Express-Validator to validate contacts input
    check('name', 'Please input a valid name')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email address')
        .isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
        .isLength({ min: 6 })
], async (req, res) => {

    // Check if there are any errors in the validation
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    // Request has been validated. Insert processing code here

    const { name, email, password } = req.body;

    try {
        // Check if a user already exists with that email
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists'});
        }

        // If user does not already exist, add them to the mongoose User model
        user = new User({
            name,
            email,
            password
        })

        // Hash password with Becrypt before sending to MongoDB
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save new user data to the MongoDB database
        await user.save()

        // Create a JSON Web Token to indicate to the client that the user is logged in
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        // If any server is caught, output the error to the console (only server side will see it)
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }

});

module.exports = router;