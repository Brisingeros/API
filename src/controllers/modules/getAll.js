'use strict';

const httpStatus = require('http-status');

module.exports = function injectToController(models, logger, store) {
    const controller = {};

    controller.path = '/kpidemascotas';
    controller.method = 'get';

    controller.handler = async function (req, res) {
        logger.info('Get info of Pets');

        let data;
        try {
            data = store.getAll(req.query.species)
        } catch (error) {
            let status = (error.error) ? httpStatus.CONFLICT : httpStatus.INTERNAL_SERVER_ERROR;
            return res.status(status).json(error);
        }

        return res.status(httpStatus.OK).json(data);
    };

    return controller;
};
