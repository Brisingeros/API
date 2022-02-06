'use strict';

const Ajv = require('ajv');
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const httpStatus = require('http-status');

/**
 * @swagger
 *  components:
 *    schemas:
 *      NotValidApiSchema:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *            nullable: false
 *            description: Error description
 *            pattern: '^Bad request: .*$'
 */
module.exports = function validateApiSchema(logger, schema) {

  function validateSchemaMiddleware(req, res, next) {
    const method = req.method;

    let content;
    if (method === 'GET') {
      content = {
        params: req.params,
        query: req.query
      };
    } else {
      content = req.body;
    }

    const valid = ajv.validate(schema, content);

    if (valid) return next();

    logger.debug('Request to ' + req.method + ' ' + req.path);
    logger.warn('Bad request: invalid body %j', content, {});
    logger.warn(ajv.errorsText());

    if (ajv.errors != null && ajv.errors.length > 0 && (ajv.errors.filter(el => el.keyword == 'maxLength') || []).length > 0)
      return res.status(httpStatus.LENGTH_REQUIRED).json({ err: 'ETOOMUCHTEXT', message: 'Bad request: ' + ajv.errorsText() });

    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Bad request: ' + ajv.errorsText() });
  }
  return validateSchemaMiddleware;
};
