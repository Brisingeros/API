'use strict';

const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API",
            version: "1.0.0",
            description: "RESTful API",
            contact: {
                name: "Kevin Carrasco",
                email: "kevin.kevin.carrasco@gmail.com"
            }
        },
        servers: [
            {
                description: 'API',
                url: process.env.BASE_URL || `http://localhost:${process.env.PORT}`
            }
        ],
        components: {
            // securitySchemes: {
            //     ApiKey: {
            //         type: 'apiKey',
            //         in: 'header',
            //         name: 'authorization'
            //     }
            // }
        }
    },
    apis: ['./src/controllers/modules/*.schema.js', './src/lib/*.js', './src/lib/**/*.js', './src/models/*.js'],
};
const specs = swaggerJsdoc(options);
module.exports = specs;