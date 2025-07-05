require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const errorHandler = require('./utils/error.handler');
const logger = require('./utils/app.logger');
const {connect} = require("./config/mongoose");
const router = require("./routes/routes.index");

const app = express();

// Initialising Mongoose
connect();

// Middleware
app.use(helmet());
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', router);


// Global Error Handler
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

module.exports = app;
