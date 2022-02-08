'use strict';

const path = require('path');
const fs = require('fs');

const expect = require('chai').expect;
const httpsRequest = require('../src/lib/httpsRequest');
const baseOptions = {
    hostname: 'localhost',
    port: 9090,
    headers: {
        'Content-Type': 'application/json'
    }
};


///////////////////

const dirContent = fs.readdirSync(__dirname);
dirContent.splice(dirContent.indexOf('index.js'), 1);

module.exports = function test() {
    for (const name of dirContent) {
        require(path.join(__dirname, name))(console, expect, httpsRequest, { ...baseOptions });
    }

    return;
};