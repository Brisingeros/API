'use strict';

/**
 * Entiendo la edad y la fecha de nacimiento como propiedades redundantes.
 * Yo dejaría la fecha de nacimiento y calcularía la edad de forma dinámica.
 * 
 * Por la definición presente en el documento, entiendo la edad en años, y será la unidad empleada para realizar los cálculos indicados.
 * Por mi parte, si no se diese el caso comentado en el primer punto, tomaría la unidad de edad en meses o días, dependiendo de los requerimientos del producto.
 */


const schema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        name: {
            type: 'string'
        },
        species: {
            type: 'string'
        },
        gender: {
            enum: ["male", "female"]
        },
        age: {
            type: 'number',
            min: 0,
            max: 99
        },
        birthdate: {
            type: "string",
            format: "date"
        }
    },
    required: ['name', 'species', 'gender', 'age', 'birthdate']
};

module.exports = schema;
