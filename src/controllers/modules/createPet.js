'use strict';

const httpStatus = require('http-status');

module.exports = function injectToController(store, logger) {
    const controller = {};

    controller.path = '/creamascota';
    controller.method = 'post';

    controller.handler = async function (req, res) {

        return res.status(httpStatus.OK).json({});
    };

    return controller;
};
