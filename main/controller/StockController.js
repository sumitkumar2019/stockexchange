"use strict";
const logger = require('../../middleware/fileLogger/logger');
const fs = require('fs');
const _ = require('lodash');

var StockService = require('../services/StockService');

class StockController {

    /**
     * constructor
     */
    constructor() {
    }

    /**
     * getStocks: getStocks Method Filter Stock on the basis of different methodology like
     * 1. base targeting
     * 2. budget check
     * 3. Base bid check
     * 4. ShortListing the highest bid
     * 5. updating the new budget
     * @param filterInput
     * @returns {Request|*|PromiseLike<T>|Promise<T>}
     */
    getStocks(filterInput) {
        logger.info('inside get Stocks');
        try {
            return StockService.baseTargeting(filterInput.country, filterInput.category).then(stocks=>{

                if(_.isEmpty(stocks) || _.isUndefined(stocks) || _.isNull(stocks)){
                    logger.info('No Company Passed from Targeting');
                    return 'No Company Passed from Targeting';
                }

                stocks = StockService.budgetCheck(stocks);

                if(_.isEmpty(stocks) || _.isUndefined(stocks) || _.isNull(stocks)){
                    logger.info('No Company Passed from Budget');
                    return 'No Company Passed from Budget';
                }

                stocks = StockService.baseBidCheck(stocks, filterInput.baseBid);

                if(_.isEmpty(stocks) || _.isUndefined(stocks) || _.isNull(stocks)){
                    logger.info('No Company Passed from BaseBid check');
                    return 'No Company Passed from BaseBid check';
                }

                stocks = StockService.shortListing(stocks);

                if(_.isEmpty(stocks) || _.isUndefined(stocks) || _.isNull(stocks)){
                    throw new Error('No Stocks');
                }
                return StockService.reduceBudget(stocks, filterInput.baseBid).then(stocks=>{
                    return stocks.companyId;
                });
            });
        }
        catch (e) {
            logger.error('Error Msg: '+ e.message);
            throw e;
         }

    }
}

module.exports = new StockController();
