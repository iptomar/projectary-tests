// We use aync/await and to support node 6 we use babel
// run 'npm run db-build' to build the required files
var main = require('./build/main.js');
main.start();