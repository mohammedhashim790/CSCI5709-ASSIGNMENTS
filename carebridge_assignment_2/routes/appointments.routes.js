const Appointment = require('../models/appointment.model');
const User = require('../models/user.model');
const {sendEmail} = require('../service/email.service');
const logger = require('../utils/app.logger');
const router = require('express').Router();

// @desc    Create new appointment
// @route   POST /api/appointments
router.post('/appointments', async (req, res) => {
    const {doctorId, date, reason} = req.body;

    // Check if doctor exists and is verified
    const doctor = await User.findOne({
        _id: doctorId, role: 'doctor', isVerified: true
    });

    if (!doctor) {
        return res.status(404).json({
            success: false, error: 'Doctor not found or unverified'
        });
    }

    const appointment = await Appointment.create({
        doctorId, patientId: req.user.id, date, reason
    });

    // Notify doctor
    await sendEmail({
        email: doctor.email, subject: 'New Appointment Request', template: 'newAppointment', data: {
            patientName: req.user.name, date: appointment.date
        }
    });

    logger.info(`Appointment created: ${appointment._id}`);
    res.status(201).json({success: true, data: appointment});
});

// @desc    Get doctor's appointments
// @route   GET /api/appointments/doctor
router.get('/doctor', async (req, res) => {
    const appointments = await Appointment.find({doctorId: req.user.id})
        .populate('patientId', 'name email')
        .sort('-date');

    res.status(200).json({success: true, data: appointments});
});


module.exports = router;
