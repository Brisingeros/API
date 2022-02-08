'use strict';

const bodyParser = require('body-parser');

module.exports = function configureExpress(app) {
    app.enable('trust proxy');
    app.use(bodyParser.json({ limit: '30mb' }));
    app.use(bodyParser.urlencoded({ extended: true }));

    app.disable('x-powered-by');

    app.use(function (err, req, res, next) {
        const errorMessage = err.stack.split('\n')[0];
        if (err) res.status(err.status).json({ message: errorMessage });
    });
};
