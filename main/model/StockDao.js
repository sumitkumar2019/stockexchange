"use strict";
const logger = require('../../middleware/fileLogger/logger');
const knex = require('../../db/knex');

class StockDao {

    constructor() {
        logger.info('inside stock dao constructor: stock dao created');
    }

    /**
     * getAllStocks: get All the stocks from stock table
     * @returns {Request|*|PromiseLike<T>|Promise<T>}
     */
    getAllStocks(){
        logger.info('getting All Stocks');
        return knex('stock').select().then(stocks=>{
            return stocks;
        });
    }

    /**
     * updateStock: Update Stock with new budget for the company stock
     * @param stock
     * @returns {Request|*|PromiseLike<T>|Promise<T>}
     */
    updateStock(stock){
        logger.info('updating Stock...');
        return knex('stock')
            .where('companyId', stock.companyId)
            .update('budget', stock.budget).then(()=>{
                return stock;
            });
    }

}

module.exports = new StockDao();
