'use strict';

const fs = require('fs');
const createRouter = require('express').Router;
const router = createRouter();
const swaggerUi = require('swagger-ui-express');
const zlib = require('zlib');

const validator = require('../lib/validateApiSchema');
const errorHandler = require('../lib/errorHandler');

module.exports = function (app, store, logger) {
  logger.info('Configuring API controllers');

  function loadController(controller, path) {
    const schemaPath = path + '.schema.js';

    const schemaExists = fs.existsSync(schemaPath);
    if (schemaExists) {
      logger.debug('Loading schema: ' + schemaPath);
      let schema = require(schemaPath);
      router[controller.method](controller.path, validator(logger, schema));
    }
    //////////////////////////////////////////////////////

    logger.debug('Loading controller: ' + schemaPath);
    router[controller.method](controller.path, async function controllerWrapper(req, res, next) {
      res.json = function (el) {
        let jsonFormat;
        try {
          jsonFormat = JSON.stringify(el) || '{}';
        } catch (error) {
          res.writeHead(res.statusCode, { 'content-type': `application/json` });
          res.end(el);
          return;
        }

        /////////////////////////////////////////////////

        // if (req.headers['user-agent'] != null && /node\.js/gi.test(req.headers['user-agent'])) {
        //   res.writeHead(res.statusCode, { 'content-type': `application/json` });
        //   res.end(jsonFormat);
        //   return;
        // }

        /////////////////////////////////////////////////

        if (jsonFormat.length < 5000) {
          res.writeHead(res.statusCode, { 'content-type': `application/json` });
          res.end(jsonFormat);
          return;
        }

        res.writeHead(res.statusCode, { 'content-type': `application/json`, 'content-encoding': 'gzip' });
        zlib.gzip(Buffer.from(jsonFormat), function (_, result) {
          res.end(result);
        });
      };

      // res.jsonGzip = function (el) {
      //   res.writeHead(res.statusCode, { 'content-type': `application/json`, 'content-encoding': 'gzip' });
      //   res.end(el);
      // };

      /////////////////////////////////////////////////

      try {
        await controller.handler(req, res, next);
      } catch (err) {
        errorHandler(logger, `${controller.method.toUpperCase()} ${controller.path}`, err, res);
      }
    });
  }

  function recursiveRequire(dir) {
    const dirContent = fs.readdirSync(dir);
    let stats;

    let i;
    let name;
    let fullpath;
    for (i in dirContent) {
      name = dirContent[i];
      fullpath = dir + '/' + name;
      stats = fs.lstatSync(fullpath);

      if (stats.isDirectory()) {
        recursiveRequire(fullpath);
        continue;
      }

      if (/.*(?<!schema)\.js/.test(name)) {
        fullpath = fullpath.replace('.js', '');

        let controller = require(fullpath)(store, logger); //InjectToController
        loadController(controller, fullpath);
      }
    }
  }

  recursiveRequire(__dirname + '/modules');

  app.use('/', router);

  /////////////////////////////////////////////////

  const specs = require('./swagger');

  router.use('/api-docs', swaggerUi.serve);
  router.get('/api-docs', (req, res, next) => {

    //authAction añade una contraseña a la llamada en la que pongas / Sustituir JWT por la key que sea
    /**
      *  /clubs/{clubId}/users_birthday:
      *    get:
      *      summary: _Public_ Returns all users whose birhtday is in the requested time period
      *      tags: [Club]
      *      security:
      *        - JWT: [] <------------------
     */
    swaggerUi.setup(specs, {
      swaggerOptions: {
        filter: true,
        withCredentials: true,
        //authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
        displayRequestDuration: true
      }
    })

    next();
  },
    swaggerUi.setup(specs, {
      swaggerOptions: {
        filter: true,
        withCredentials: true,
        //authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
        displayRequestDuration: true,
      }
    })
  );

};
