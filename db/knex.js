const environment = process.env.NODE_ENV || 'development';
console.log(environment);
const config = require('../config/dbConfig')[environment];
module.exports = require('knex')(config);