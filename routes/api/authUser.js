require('dotenv').config();
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authUser = require('../../middleware/authUser');

const User = require('../../models/User');
const Doctor = require('../../models/Doctor');
const Profile = require('../../models/Profile');

// @route   GET api/authUser
// @desc    Tests auth User route
// @access  Public
router.get('/', authUser, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   post api/authUser
// @desc    Authenticate User and get Token
// @access  Public
router.post('/',
[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password required').exists()
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
        // If User exists
        let user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid cridentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid cridentials' }] });
        }

        // Return jsonwebtoken

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.jwtSecret,
            {expiresIn: 36000},
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   Delete api/authUser/:appointment_id
// @desc    Delete a appointment
// @access  Private
router.delete('/:appointment_id', authUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        const doctorId = user.appointments
            .map(item => (
                item.id === req.params.appointment_id
                ) ? item.doctor : null
            );  
         
        const newId = doctorId.filter( doctor => doctor !== null);
            
        const profile = await Profile.findOne({ doctor: newId[0]});
        
        // Get the remove index for user
        const removeIndexUser = user.appointments
            .map(item => item.id)
            .indexOf(req.params.appointment_id);

        const removeIndex = user.appointments[removeIndexUser].bookingId;
        user.appointments.splice(removeIndexUser, 1);

        await user.save();
        
        if(profile !== null) {
            const indexDoctor = profile.patients
                .map(item => item.bookingId)
                .indexOf(removeIndex);
            
            profile.patients.splice(indexDoctor, 1);
    
            await profile.save();

        } else {
            console.log("No Dcotor exist");
        }
    
        // Return user
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   Delete api/authUser
// @desc    Delete profile, doctor
// @access  Private
router.delete('/', authUser, async (req, res) => {
    try {
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: "User deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;