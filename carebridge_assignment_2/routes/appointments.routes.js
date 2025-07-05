const Appointment = require('../models/appointment.model');
const User = require('../models/user.model');
const logger = require('../utils/app.logger');
const {sendVerificationEmail} = require("../service/email.service");
const e = require("express");
const router = require('express').Router();

// @desc    Create new appointment
const generateLink = () => {
    const SALT = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0129384756';
    const SALT_LENGTH = 10;
    var link = "";
    for (let i = 0; i < SALT_LENGTH; i++) {
        const random = Math.floor(Math.random() * SALT.length);
        link += SALT[random];
    }
    return link;

};
// @route   POST /api/appointments
router.post('/create', async (req, res) => {
    const {doctorId, patientId, date, reason, location} = req.body;

    // Check if doctor exists and is verified
    const doctor = await User.findOne({
        _id: doctorId, role: 'doctor', isVerified: true
    });

    var link = undefined;
    if (location.toLowerCase() === 'online') {
        link = generateLink();
    }

    if (!doctor) {
        return res.status(404).json({
            success: false, error: 'Doctor not found or unverified'
        });
    }


    const appointment = await Appointment.create({
        doctorId, patientId: patientId, date, reason, link: link ?? 'InClinic'
    });

    await sendVerificationEmail(doctor.email, 'newAppointment', {
        time: appointment.date, location: location, link: link ?? 'InClinic'
    });

    logger.info(`Appointment created: ${appointment._id}`);
    res.status(201).json({success: true, data: appointment});
});

// @desc    Get doctor's appointments
// @route   GET /api/appointments/doctor
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find({doctorId: req.body.id})
            .populate('patientId', 'name email')
            .sort('-date');

        res.status(200).json({success: true, data: appointments});
    } catch (e) {
        res.status(400).json({success: false, error: "Doctor Id is invalid or no appointments is not found."});

    }
});


module.exports = router;
