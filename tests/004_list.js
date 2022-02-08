'use strict';

module.exports = function test(logger, expect, httpsRequest, baseOptions) {
    baseOptions.path = '/lismascotas';
    baseOptions.method = 'GET';

    ///////////

    describe('Successful pet list', () => {
        it('Should get list', async () => {
            let data;
            let error;
            try {
                data = await httpsRequest(logger, baseOptions);
            } catch (err) {
                error = err;
            }

            ///

            expect(error == null).to.be.true;
            expect(data == null).to.be.false;
            expect(data).to.not.be.empty;
        });
    });

    ///////////

    return;
};