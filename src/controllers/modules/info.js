'use strict';

const httpStatus = require('http-status');

module.exports = function injectToController(models, logger, store) {
    const controller = {};

    controller.path = '/lismascotas';
    controller.method = 'get';

    controller.handler = async function (req, res) {
        logger.info('Get list of Pets');

        return res.status(httpStatus.OK).json(store.animals);
    };

    return controller;
};
