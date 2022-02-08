'use strict';

module.exports = function test(logger, expect, httpsRequest, baseOptions) {
    // baseOptions.path = '/lismascotas';
    baseOptions.method = 'GET';

    ///////////

    describe('Successful kpidemascotas', () => {
        it('Should get mode, mean and deviation', async () => {
            let options = { ...baseOptions, ...{ path: '/kpidemascotas?species=Perro' } };

            let data;
            let error;
            try {
                data = await httpsRequest(logger, options);
            } catch (err) {
                error = err;
            }

            ///

            expect(error == null).to.be.true;
            expect(data == null).to.be.false;
            expect(data.speciesMode).to.equal('Perro');
            expect(data.ageMean).to.equal(8);
            expect(data.ageDeviation).to.equal(4.242640687119285);
        });
    });

    describe('Successful kpidemascotas with void species', () => {
        it('Should get mode only', async () => {
            let options = { ...baseOptions, ...{ path: '/kpidemascotas?species=None' } };

            let data;
            let error;
            try {
                data = await httpsRequest(logger, options);
            } catch (err) {
                error = err;
            }

            ///

            expect(error == null).to.be.true;
            expect(data == null).to.be.false;
            expect(data.speciesMode).to.equal('Perro');
            expect(data.ageMean == null).to.be.true;
            expect(data.ageDeviation == null).to.be.true;
        });
    });

    ///////////

    return;
};