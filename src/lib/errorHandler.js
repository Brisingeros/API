'use strict';

const httpStatus = require('http-status');

module.exports = function errorHandler(logger, apiName, err, res) {
    err.referenceCode = new Date().valueOf();
    logger.error(apiName + ': %s. ReferenceCode: %s', err.message, err.referenceCode);

    if (err.statusCode) {
        const content = { message: err.message, referenceCode: err.referenceCode };
        res.status(err.statusCode).json(content);
        return;
    }

    console.log(err);

    const content = {
        message: 'Internal server error caused by: ' + (err.message || JSON.stringify(err)),
        referenceCode: err.referenceCode,

    };
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(content);
};
