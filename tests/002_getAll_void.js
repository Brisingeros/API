'use strict';

const httpStatus = require('http-status');

module.exports = function test(logger, expect, httpsRequest, baseOptions) {
    baseOptions.path = '/kpidemascotas?species=12';
    baseOptions.method = 'GET';

    ///////////

    describe('Void pet list', () => {
        it('Should get error', async () => {
            let data;
            let error;
            try {
                data = await httpsRequest(logger, baseOptions);
            } catch (err) {
                error = err;
            }

            ///

            expect(data == null).to.be.true;
            expect(error == null).to.be.false;
            expect(error.statusCode).to.equal(httpStatus.CONFLICT);
        });
    });

    ///////////

    return;
};