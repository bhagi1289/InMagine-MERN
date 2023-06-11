const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'logs/app.log' }) // Log to a file
  ],
  format: winston.format.combine(
    winston.format.timestamp(), // Include timestamps
    winston.format.json() // Log in JSON format
  )
});

// Export the logger instance
module.exports = logger;
