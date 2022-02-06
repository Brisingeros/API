'use strict';

/**
 * @swagger
 *  components:
 *    schemas:
 *      Animal:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            nullable: false
 *            description: Pet's name
 *          species:
 *            type: string
 *            nullable: false
 *            description: Pet's species
 *          gender:
 *            type: string
 *            nullable: false
 *            enum: [male, female]
 *            description: Pet's gender
 *          age:
 *            type: integer
 *            nullable: false
 *            description: Pet's age in full years
 *          birthdate:
 *            type: string
 *            nullable: false
 *            description: Pet's date of birth 'yyyy-mm-dd'
 *            pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
 */

/**
 * Class Animal represents a pet
 * @class
 * @constructor
 * @public
 */
class Animal {
    /**
     * Create a pet
     * @param {string} name             - The pet's name
     * @param {string} species          - The pet's species
     * @param {'male'|'female'} gender  - The pet's gender
     * @param {number} age              - The pet's age in full years
     * @param {string} birthdate        - The pet's date of birth 'yyyy-mm-dd'
     */
    constructor(name, species, gender, age, birthdate) {
        /**
         * The pet's name
         * @type {string}
         * @public
         */
        this.name = name;

        /**
         * The pet's species
         * @type {string}
         * @public
         */
        this.species = species;

        /**
         * The pet's gender
         * @type {'male'|'female'}
         * @public
         */
        this.gender = gender;

        /**
         * The pet's age in years
         * @type {number}
         * @public
         */
        this.age = age;

        /**
         * The pet's date of birth 'yyyy-mm-dd'
         * @type {string}
         * @public
         */
        this.birthdate = birthdate;
    }

    ///////////////////////////////

    // /**
    //  * The pet's real age, calculated by difference between now and birthdate
    //  * @type {number}
    //  * @public
    //  */
    // get realAge() {
    //     let realAge = 0;
    //     let auxVar1;
    //     let auxVar2;

    //     let now = new Date();
    //     let ageParts = this.age.split('-');

    //     ///

    //     auxVar1 = parseInt(ageParts[0]);
    //     auxVar2 = now.getFullYear();
    //     if (auxVar1 >= auxVar2)
    //         return realAge;

    //     realAge += (auxVar2 - auxVar1 - 1);

    //     ///

    //     auxVar1 = parseInt(ageParts[1]);
    //     auxVar2 = (now.getMonth() + 1);
    //     if (auxVar1 >= auxVar2)
    //         return realAge;

    //     auxVar1 = parseInt(ageParts[2]);
    //     auxVar2 = (now.getDate() + 1);
    //     if (auxVar1 >= auxVar2)
    //         return realAge;

    //     realAge += 1;

    //     ///

    //     return realAge;
    // }
}

module.exports = Animal;