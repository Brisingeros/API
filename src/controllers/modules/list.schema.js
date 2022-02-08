
'use strict';

/**
 * @swagger
 * path:
 *  /lismascotas:
 *    get:
 *      summary: Get full Store Animal list
 *      tags: [Pet]
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Animal'  
 *        "400":
 *          description: BAD_REQUEST
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NotValidApiSchema'
 */
const schema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        params: {
            type: 'object',
            additionalProperties: false
        },
        query: {
            type: 'object',
            additionalProperties: false
        }
    }
};

module.exports = schema;
