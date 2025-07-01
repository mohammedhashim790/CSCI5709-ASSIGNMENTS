const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    doctorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    patientId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date: {type: Date, required: true},
    reason: {type: String, required: true},
    status: {type: String, enum: ['pending', 'approved', 'rejected', 'cancelled'], default: 'pending'},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
