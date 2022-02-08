'use strict';

module.exports = function test(logger, expect, httpsRequest, baseOptions) {
    baseOptions.path = '/api-docs/';
    baseOptions.method = 'GET';

    ///////////

    describe('Swagger generated', () => {
        it('Should get html', async () => {
            let data;
            let error;
            try {
                data = await httpsRequest(logger, baseOptions);
            } catch (err) {
                error = err;
            }

            ///

            expect(data == null).to.be.false;
            expect(error == null).to.be.true;
        });
    });

    ///////////

    return;
};