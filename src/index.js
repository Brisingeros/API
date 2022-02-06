'use strict';

const cluster = require('cluster');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.HOST = process.env.HOST || '0.0.0.0';
process.env.PORT = process.env.PORT || 9090;

const env = process.env.NODE_ENV;

console.log('Loading logger');
const logger = console;

const promise = init();
module.exports = promise;

async function init() {

    cluster.on('exit', function (worker) {
        // Replace the dead worker.
        logger.log('Worker %d died', worker.id);
        cluster.fork();
    });

    if (cluster.isMaster) {
        let cpuCount = Math.min(Math.max(require('os').cpus().length, 2), 8);

        logger.info('CPUCOUNT: ', cpuCount);

        for (let i = 0; i < cpuCount; i += 1) {
            cluster.fork();
        }
    } else {
        // Requires and configure express
        logger.info('Configuring express');
        const express = require('express');
        const app = express();

        const configureExpress = require('./express');
        configureExpress(app);


        // API routes and controllers
        require('./controllers')(app, [], logger);

        // Create server
        logger.info('Starting up server...');
        let host = process.env.HOST;
        let port = process.env.PORT;

        const server = app.listen(port, host, function serverListen() {
            host = server.address().address;
            port = server.address().port;
            logger.info('App listening at http://' + host + ':' + port, 'in mode:', env);
        });

        return server;
    }
}
