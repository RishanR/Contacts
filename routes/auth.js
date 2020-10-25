const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        //Find the user by ID
        const user = await User.findById(req.user.id).select('-password')
        res.json(user);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
});

// @route   POST api/auth
// @desc    Auth user and get token
// @access  Public
router.post('/', [
    check('email', 'Please input a valid email')
        .isEmail(),
    check('password', 'Password is required')
        .exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        // Check if a user with this email exists
        if (!user){
            return res.status(400).json({ msg: 'User with this email does not exists'})
        }

        // Check if the password entered by the user is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "The password is incorrect"})
        }

        // Create a JSON Web Token to send to the client to indicate that the login was successful
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

    } catch (err){
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;