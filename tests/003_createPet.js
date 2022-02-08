'use strict';

module.exports = function test(logger, expect, httpsRequest, baseOptions) {
    baseOptions.path = '/creamascota';
    baseOptions.method = 'POST';

    const baseBody = {
        name: 'Andy',
        species: 'Perro',
        gender: 'male',
        age: 11,
        birthdate: '2010-07-12'
    };

    ///////////

    describe('Failed pet creations', () => {
        it('Should fail name', async () => {
            let body = { ...baseBody, ...{ name: 12 } };

            ///

            let data;
            let error;
            try {
                data = await httpsRequest(logger, baseOptions, body);
            } catch (err) {
                error = err;
            }

            ///

            expect(data == null).to.be.true;
            expect(error == null).to.be.false;
        });


        it('Should fail species', async () => {
            let body = { ...baseBody, ...{ species: 12 } };

            ///

            let data;
            let error;
            try {
                data = await httpsRequest(logger, baseOptions, body);
            } catch (err) {
                error = err;
            }

            ///

            expect(data == null).to.be.true;
            expect(error == null).to.be.false;
        });

        it('Should fail gender', async () => {
            let body = { ...baseBody, ...{ gender: 'none' } };

            ///

            let data;
            let error;
            try {
                data = await httpsRequest(logger, baseOptions, body);
            } catch (err) {
                error = err;
            }

            ///

            expect(data == null).to.be.true;
            expect(error == null).to.be.false;
        });

        it('Should fail age', async () => {
            let body = { ...baseBody, ...{ age: -1 } };

            ///

            let data;
            let error;
            try {
                data = await httpsRequest(logger, baseOptions, body);
            } catch (err) {
                error = err;
            }

            ///

            expect(data == null).to.be.true;
            expect(error == null).to.be.false;
        });

        it('Should fail birthdate', async () => {
            let body = { ...baseBody, ...{ birthdate: '20-10-1997' } };

            ///

            let data;
            let error;
            try {
                data = await httpsRequest(logger, baseOptions, body);
            } catch (err) {
                error = err;
            }

            ///

            expect(data == null).to.be.true;
            expect(error == null).to.be.false;
        });
    });

    ///////////

    describe('Successful pet creations', () => {
        it('Should create pet 1', async () => {
            let body = baseBody;

            ///

            let data;
            let error;
            try {
                data = await httpsRequest(logger, baseOptions, body);
            } catch (err) {
                error = err;
            }

            ///

            expect(error == null).to.be.true;
            expect(data == null).to.be.false;
            expect(JSON.stringify(data)).to.equal('{}');
        });

        it('Should create pet 2', async () => {
            let body = baseBody;

            ///

            let data;
            let error;
            try {
                data = await httpsRequest(logger, baseOptions, body);
            } catch (err) {
                error = err;
            }

            ///

            expect(error == null).to.be.true;
            expect(data == null).to.be.false;
            expect(JSON.stringify(data)).to.equal('{}');
        });

        it('Should create pet 3', async () => {
            let body = { ...baseBody, ...{ age: 2 } };

            ///

            let data;
            let error;
            try {
                data = await httpsRequest(logger, baseOptions, body);
            } catch (err) {
                error = err;
            }

            ///

            expect(error == null).to.be.true;
            expect(data == null).to.be.false;
            expect(JSON.stringify(data)).to.equal('{}');
        });

        it('Should create pet different', async () => {
            let body = { ...baseBody, ...{ species: 'Gato' } };

            ///

            let data;
            let error;
            try {
                data = await httpsRequest(logger, baseOptions, body);
            } catch (err) {
                error = err;
            }

            ///

            expect(error == null).to.be.true;
            expect(data == null).to.be.false;
            expect(JSON.stringify(data)).to.equal('{}');
        });
    });

    ///////////

    return;
};