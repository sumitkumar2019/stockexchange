"use strict";
const logger = require('../../middleware/fileLogger/logger');
const fs = require('fs');
const _ = require('lodash');

var StockValidator = require('../validators/StockValidator');
var StockController = require('../controller/StockController');

class StockRoutes {

    /**
     * constructor
     * @param router
     */
    constructor(router) {
        this.router = router;
        this.registerPath();
    }

    /**
     * registerPath: This method Register the /stock Path
     */
    registerPath() {
        logger.info('Path /Stocks Registered');
        this.router.get('/', this.getStocks.bind(this));
    }

    /**
     * getStocks: get Stocks after validating request and business logic
     * @param req
     * @param res
     */
    getStocks(req, res) {

        logger.info('inside get Stocks');

        try {
            var filterInput = StockValidator.validateRequest(req.query.country, req.query.category, req.query.baseBid);
            return StockController.getStocks(filterInput).then(result=>{
                res.send(result);
            });
        }
        catch (e) {
            logger.error('Error Msg: '+ e.message);
            res.send("Error Msg: "+ e.message)
         }

    }

}

module.exports = StockRoutes;
