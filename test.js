'use strict';

process.env.TEST = true;

require('./src');
// require('./tests')().then(() => { process.exit(); });
require('./tests')();