"use strict";
const logger = require('../../middleware/fileLogger/logger');
;
const _ = require('lodash');
var StockDao = require('../model/StockDao');

class StockService {


    /**Exchange Internal Matching Logic:  This is the most important component to code
     where all matching logic will sit. Follow this order for selecting best company and log
     all details into log file.**/


    //Constructor
    constructor() {
        logger.info('inside stock service constructor: stock service created');
    }

    /**
     *Base Targeting:  Match companies based on Country, Category. If no
     *company passed from these filters then send response as “No Companies
     *Passed from Targeting” to external client. Include logs like: BaseTargeting:
     *{C1, Passed},{C2,Failed},{C1,Passed}
     */

    baseTargeting(country, category) {

        logger.info('base targeting.');

        return StockDao.getAllStocks().then(stocks => {
            var filteredStocks = [];
            if (!_.isEmpty(stocks)) {

                var countries, categories;

                stocks.forEach((stock, index) => {

                    if (!_.isEmpty(stock.countries) || !_.isUndefined(stock.countries)) {
                        countries = (stock.countries).split(',');
                    }

                    if (!_.isEmpty(stock.category) || !_.isUndefined(stock.category)) {
                        categories = (stock.category).split(',');
                    }

                    if (_.indexOf(countries, country) <= -1 && _.indexOf(categories, category) <= -1) {
                        logger.info('Base Targeting:{' + stock.companyId + ', Failed}');
                        delete stocks[index];
                    } else {
                        logger.info('Base Targeting:{' + stock.companyId + ', Passed}');
                        filteredStocks.push(stock);
                    }
                });
            }
            return filteredStocks;
        });
    }

    /**
     *Budget Check: Check if Companies had some budget to sell stocks. If no
     *companies passed from the filters then send response as “No Companies
     *Passed from Budget” to external client. Include logs like: BudgetCheck: {C1,
     *Passed},{C2,Failed},{C1,Passed}
     */

    budgetCheck(stocks) {

        logger.info('budget check.');

        var filteredStocks = [];

        if (!_.isEmpty(stocks) && !_.isNull(stocks)) {
            stocks.forEach((stock, index) => {
                if (_.isEmpty(stock.budget)) {
                    logger.info('{' + stock.companyId + ', Failed}');
                    delete stocks[index];
                } else {
                    logger.info('{' + stock.companyId + ', Passed}');
                    filteredStocks.push(stock)
                }
            });
        }
        return filteredStocks;
    }

    /*
    *BaseBid Check: Check if the bid is more than the API base bid. If no
    *companies passed from the filter then send response as “No Companies
    *Passed from BaseBid check” to external client. Include in logs like: BaseBid:
    *{C1, Passed},{C2,Failed},{C1,Passed}
     */

    baseBidCheck(stocks, baseBid) {
        logger.info('base bid check.');

        var filteredStocks = [];

        if (!_.isEmpty(stocks) && !_.isNull(stocks)) {
            stocks.forEach((stock, index) => {
                if(!_.isEmpty(stock.bid) || !_.isUndefined(stock.bid)){
                    var oldBid = Number(stock.bid.replace('cent', '').trim());

                    baseBid = Number(baseBid);
                    if ((!_.isUndefined(oldBid) || !_.isNull(oldBid)) && oldBid > baseBid) {
                        logger.info('BaseBid: {' + stock.companyId + '}, Failed');
                        delete stocks[index];
                    } else {
                        logger.info('BaseBid: {' + stock.companyId + '}, Passed');
                        filteredStocks.push(stock)
                    }
                }

            });
        }
        return filteredStocks;
    }

    /**
     *Shortlisting: If more than one company passed from BaseBid check then
     *select the highest one and send response = CompanyID. Include in logs like:
     *Winner = CompanyID.
     */

    shortListing(stocks) {
        logger.info('short listing.');
        if (!_.isEmpty(stocks)) {
            stocks = _.sortBy(stocks, ['bid']);
            return stocks[0];
        }
        return null;
    }

    /**
     *Reduce Budget: Once CompanyID is sent to external client then update
     *Budget New = Budget ­ Bid and use Budget New for future transactions.
     */

    reduceBudget(stock, bid) {
        logger.info('reduce budget.');
        if (!_.isEmpty(stock) && (!_.isNull(bid) || !_.isUndefined(bid))) {
            if(!_.isUndefined(stock.budget) && !_.isNull(stock.budget)){
                var oldBudget = Number(stock.budget.replace('$', '').trim());
                bid = Number(bid);
                var dollar = bid / 100;
                dollar = oldBudget - dollar;
                dollar.toLocaleString("en-US", {style:"currency", currency:"USD"});
                stock.budget = dollar +'$';
                return StockDao.updateStock(stock);
            }
        }
        return stock;
    }
}


module.exports = new StockService();
