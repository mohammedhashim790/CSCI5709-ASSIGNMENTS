const router = require('express').Router();

const authRoutes = require("./auth.routes");
const appointmentsRoutes = require("./appointments.routes");

router.use('/auth', authRoutes);
router.use('/appointments', appointmentsRoutes);

module.exports = router;
