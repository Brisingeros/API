'use strict';

/**
 * @swagger
 * path:
 *  /kpidemascotas:
 *    get:
 *      summary: Get full Store Animal info
 *      tags: [Pet]
 *      parameters:
 *        - in: query
 *          name: species
 *          schema:
 *            type: string
 *          required: true
 *          description: Species to get age mean and deviation
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  ageMean:
 *                      type: number
 *                      description: Target species mean of age
 *                  ageDeviation:
 *                      type: number
 *                      description: Target species standard age deviation
 *                  speciesMode:
 *                      type: string
 *                      description: Most repeated species
 *        "400":
 *          description: BAD_REQUEST
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NotValidApiSchema'
 *        "409":
 *          description: BAD_REQUEST
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                      type: string
 *                      description: Error code
 */
const schema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        params: {
            type: 'object'
        },
        query: {
            type: 'object',
            additionalProperties: false,
            properties: {
                species: {
                    type: 'string'
                }
            },
            required: ['species']
        }
    }
};

module.exports = schema;
