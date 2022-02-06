'use strict';

const Animal = require('./Animal');

//////////////////////////////////////////////////////////////////////////////////////

/**
 * @swagger
 *  components:
 *    schemas:
 *      Store:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/Animal'
 */

/**
 * Class Store represents a pet array
 * @class
 * @constructor
 * @public
 */
class Store {
    /**
     * Create a Store to hold Animals.
     */
    constructor() {
        /**
         * The pet's array
         * @type {Array<Animal>}
         * @public
         */
        this.animals = [];
    }

    ///////////////////////////////

    /**
     * Add a pet to the array
     * @param {Animal} animal   - The pet
     * @returns {Array<Animal>}
     */
    addPet(animal) {
        this.animals.push(animal);
    }

    /**
     * Get all info from pet store
     * @param {string} species   - The pet's species to calculate
     * @returns {{ageMean: number, ageDeviation: number, speciesMode: string}}
     */
    getAll(species) {
        if (this.animals.length == 0)
            throw { error: 'ENOTANIMALS' };

        let ageMean = 0;
        let ageDeviation = [];
        let speciesMode = {};

        //////////

        this.animals.forEach(animal => {
            if (animal.species == species) {
                ageMean += animal.age;
                ageDeviation.push(animal.age);
            }

            speciesMode[animal.species] = (speciesMode[animal.species] == null) ? 1 : speciesMode[animal.species]++;
        });

        //////////

        let occurrences = ageDeviation.length;
        ageMean = ageMean / occurrences;
        ageDeviation = ageDeviation.reduce(function (r, a) { r += Math.pow(Math.abs(a - ageMean), 2); return r; }, 0);
        ageDeviation = Math.sqrt(ageDeviation / occurrences);

        speciesMode = Object.keys(speciesMode).reduce((a, b) => obj[a] > obj[b] ? a : b);

        //////////

        return { ageMean, ageDeviation, speciesMode };
    }
}

module.exports = Store;