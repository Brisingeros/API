'use strict';

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
