'use strict';

const errorHandler = require('../src/lib/errorHandler')

module.exports = function test(logger, expect) {
    describe('Fake error', () => {
        it('No statusCode', async () => {
            let errExample;
            errorHandler(logger, 'fake', { err: 'ENONE' }, { status: function () { return this }, json: function (content) { errExample = content } });

            expect(Object.keys(errExample).toString()).to.equal('message,referenceCode');
        });

        it('StatusCode', async () => {
            let errExample;
            errorHandler(logger, 'fake', { statusCode: 500 }, { status: function () { return this }, json: function (content) { errExample = content } });

            expect(Object.keys(errExample).toString()).to.equal('message,referenceCode');
        });
    });

    ///////////

    return;
};