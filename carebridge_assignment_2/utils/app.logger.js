// [Winston] is a logger library in NPM.
const winston = require('winston');
const {combine, timestamp, printf, colorize} = winston.format;

const logFormat = printf(({level, message, timestamp, stack}) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    format: combine(colorize(), timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), logFormat),
    transports: [new winston.transports.Console({
        forceConsole: true,
        debugStdout: true,
    }), new winston.transports.File({
        filename: 'logs/error.log', level: 'error'
    })],
    exceptionHandlers: [new winston.transports.File({
        filename: 'logs/exceptions.log'
    })],

});

// Morgan stream for HTTP logging
logger.stream = {
    write: (message) => logger.info(message.trim())
};

module.exports = logger;
