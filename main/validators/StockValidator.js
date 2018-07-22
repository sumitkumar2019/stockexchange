"use strict";
const logger = require('../../middleware/fileLogger/logger');
const _ = require('lodash');


class StockValidator {

    constructor() {
    }

    validateRequest(country, category, baseBid) {

        if (_.isUndefined(country) || _.isNull(country)) {
            throw new Error('required parameter missing: country');
        }

        if (!_.isString(country) || _.isEmpty(country)) {
            throw new Error('required parameter should be string and not empty: country');
        }

        if (_.isUndefined(category) || _.isNull(category)) {
            throw new Error('required parameter missing: category');
        }

        if (!_.isString(category) || _.isEmpty(category)) {
            throw new Error('required parameter should be string and not empty: category');
        }

        if (_.isUndefined(baseBid) || _.isNull(baseBid)) {
            throw new Error('required parameter missing: baseBid');
        }

        if (!_.isString(baseBid) || _.isEmpty(baseBid)) {
            throw new Error('required parameter should be string and not empty: baseBid');
        }

        logger.info('request parameters validated successfully: country:' + country + ', category:' + category + ' & bid: ' + baseBid);

        return {country: country, category: category, baseBid: baseBid};
    }

}

module.exports = new StockValidator();
