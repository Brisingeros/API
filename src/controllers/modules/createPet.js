'use strict';

const httpStatus = require('http-status');

module.exports = function injectToController(models, logger, store) {
    const controller = {};

    controller.path = '/creamascota';
    controller.method = 'post';

    controller.handler = async function (req, res) {
        logger.info('Create Pet');

        let pet = new models.Animal(req.body.name, req.body.species, req.body.gender, req.body.age, req.body.birthdate);
        store.addPet(pet);

        logger.info('Pet created successfully');

        return res.status(httpStatus.OK).json();
    };

    return controller;
};
