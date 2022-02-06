'use strict';

const path = require('path');
const fs = require('fs');

const models = {};

const dirContent = fs.readdirSync(__dirname);
dirContent.forEach(function (name) {
    if (name.split('.').pop() !== 'js' || name === 'index.js') return;

    let model = require(path.join(__dirname, name));
    models[model.name] = model;
});


module.exports = models;