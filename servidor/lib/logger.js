var winston = require('winston');
var httpContext = require('express-http-context');
// Wrap Winston logger to print reqId in each log
var formatMessage = function(message) {
    var reqId = httpContext.get('reqId');
    message = reqId ? message + " reqId: " + reqId : message;
    return message;
};
var logger = {
    log: function(level, message) {
        winston.log(level, formatMessage(message));
    },
    error: function(message) {
        winston.error(formatMessage(message));
    },
    warn: function(message) {
        winston.warn(formatMessage(message));
    },
    verbose: function(message) {
        winston.verbose(formatMessage(message));
    },
    info: function(message) {
        winston.info(formatMessage(message));
    },
    debug: function(message) {
        winston.debug(formatMessage(message));
    },
    silly: function(message) {
        winston.silly(formatMessage(message));
    }
};
module.exports = logger;