var express = require('express');
var app = express();
var router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/stocks', router);
var StockRoutes = require('./main/routes/StockRoutes');
var stockRoutes = new StockRoutes(router);

module.exports = app;