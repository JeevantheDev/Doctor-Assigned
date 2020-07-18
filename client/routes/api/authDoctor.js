require('dotenv').config();
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authDoctor = require('../../middleware/authDoctor');

const Doctor = require('../../models/Doctor');

// @route   GET api/authDoctor
// @desc    Tests auth Doctor route
// @access  Public
router.get('/', authDoctor, async(req, res) => {
    try {
        const doctor = await Doctor.findById(req.doctor.id).select('-password');
        res.json(doctor);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   post api/authDoctor
// @desc    Authenticate Doctor and get Token
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
        // If Doctor exists
        let doctor = await Doctor.findOne({ email });

        if(!doctor) {
            return res.status(400).json({ errors: [{ msg: 'Invalid cridentials' }] });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid cridentials' }] });
        }

        // Return jsonwebtoken

        const payload = {
            doctor: {
                id: doctor.id
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

module.exports = router;