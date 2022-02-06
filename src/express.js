'use strict';

const bodyParser = require('body-parser');

module.exports = function configureExpress(app) {
    app.enable('trust proxy');
    app.use(bodyParser.json({ limit: '30mb' }));
    app.use(bodyParser.urlencoded({ extended: true }));

    app.disable('x-powered-by');

    /* eslint-disable no-unused-vars */
    app.use(function (err, req, res, next) {
        /* eslint-enable no-unused-vars */
        const errorMessage = err.stack.split('\n')[0];
        if (err) res.status(err.status).json({ message: errorMessage });
    });
};
