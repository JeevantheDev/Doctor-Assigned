require('dotenv').config();
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const authUser = require('../../middleware/authUser');

const User = require('../../models/User');
const Doctor = require('../../models/Doctor');
const Profile = require('../../models/Profile');


// @route   Post api/appointment/:doctor_id
// @desc    Create a user appointment
// @access  Private
router.post('/:doctor_id', [authUser,
    [
        check('patientname', 'Patient name is required')
            .not()
            .isEmpty(),
        check('fathername', 'Father name is required')
            .not()
            .isEmpty(),
        check('age', 'Age is required')
            .not()
            .isEmpty(),
        check('description', 'Description is required')
            .not()
            .isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const doctor = await Doctor.findById(req.params.doctor_id).select('-password');
        const profile = await Profile.findOne({ doctor: req.params.doctor_id });

        // Create booking id 
        function appointmentGenerator() {
	 
            this.length = 8;
            this.timestamp = +new Date;
            
            var _getRandomInt = function( min, max ) {
               return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
            }
            
            this.generate = function() {
                var ts = this.timestamp.toString();
                var parts = ts.split( "" ).reverse();
                var id = "";
                
                for( var i = 0; i < this.length; ++i ) {
                   var index = _getRandomInt( 0, parts.length - 1 );
                   id += parts[index];	 
                }
                
                return id;
            }
        }

        const create_id = new appointmentGenerator();
        const appointmentId = create_id.generate();

        const newPatient = {
            bookingId: appointmentId,
            patientname: req.body.patientname,
            fathername: req.body.fathername,
            status: req.body.status,
            age: req.body.age,
            date: req.body.date,
            description: req.body.description,
            avatar: user.avatar,
            name: user.name,
            user: req.user.id
        }
        
        const newAppointment = {
            bookingId: appointmentId,
            patientname: req.body.patientname,
            fathername: req.body.fathername,
            status: req.body.status,
            age: req.body.age,
            date: req.body.date,
            description: req.body.description,
            avatar: doctor.avatar,
            name: doctor.name,
            doctor: doctor.id
        }

        profile.patients.unshift(newPatient);

        await profile.save();

        user.appointments.unshift(newAppointment);
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// // @route   Delete api/appointment/:appointment_id
// // @desc    Delete a appointment
// // @access  Private
// router.delete('/:appointment_id', authUser, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select('-password');
        
//         const doctorId = user.appointments
//             .map(item => {
//                 if(item.id === req.params.appointment_id) {
//                     return item.doctor;
//                 }
//             })        
//         const profile = await Profile.findOne({ doctor: doctorId[0]});
        
//         // Get the remove index for user
//         const removeIndexUser = user.appointments
//             .map(item => item.id)
//             .indexOf(req.params.appointment_id);
          
//         user.appointments.splice(removeIndexUser, 1);
//         await user.save();

//         // Get the remove index for doctor
//         const removeIndexDoctor = profile.patients
//         .map(item => item.id)
//         .indexOf(req.params.appointment_id);
        
//         profile.patients.splice(removeIndexDoctor, 1);
//         await profile.save();

//         // Return user
//         res.json(user);
//     } catch (err) {
        
//     }
// });


module.exports = router;