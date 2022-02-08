'use strict';

const https = require(process.env.TEST ? 'http' : 'https');
const Stream = require('stream').Transform;

module.exports = function request(logger, options, body = null) {
    return new Promise((resolve, reject) => {
        let data = new Stream();

        ///////////

        const req = https.request(options, (res) => {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                logger.log('HTTP Status Error: ', res.statusCode);
                reject(res);

                return;
            }

            res.on('data', (d) => {
                data.push(d);
            });

            res.on('end', () => {
                try {
                    data = data.read();

                    if (res.headers['content-type'] == 'application/json')
                        data = JSON.parse(data);
                } catch (error) {
                    logger.log('HTTP Response Error: ', error);
                    reject(error);

                    return;
                }

                ///

                resolve(data);
            });
        });
        req.on('error', (e) => {
            logger.log('HTTP Query Error: ', e);
            reject(e);
        });

        ///////////

        if (body != null) req.write(JSON.stringify(body));
        req.end();


    });
};