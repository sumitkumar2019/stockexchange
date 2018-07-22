var chai = require('chai');
var td = require('testdouble');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var StockValidator;

const result ={
    country: 'IN',
    category: 'Auto',
    baseBid: '20'
}

beforeEach('Before Each: Stock Validator', function(){
    StockValidator = require('../../../main/validators/StockValidator');
});
afterEach('After Each: Stock Validator', function(){
    td.reset();
});
describe('validate Request', function () {

    it('should return error if country not found', function () {
        expect(() => StockValidator.validateRequest(undefined, 'Auto', '20')).to.throw('required parameter missing: country');
    });
    it('should return error if country not String', function () {
        expect(() => StockValidator.validateRequest(10, 'Auto', '20')).to.throw('required parameter should be string and not empty: country');
    });

    it('should return error if category not found', function () {
        expect(() => StockValidator.validateRequest('IN', undefined, '20')).to.throw('required parameter missing: category');
    });
    it('should return error if category not String', function () {
        expect(() => StockValidator.validateRequest('IN', 10, '20')).to.throw('required parameter should be string and not empty: category');
    });

    it('should return error if baseBid not found', function () {
        expect(() => StockValidator.validateRequest('IN', 'Auto', undefined)).to.throw('required parameter missing: baseBid');
    });
    it('should return error if baseBid not String', function () {
        expect(() => StockValidator.validateRequest('IN', 'Auto', 10)).to.throw('required parameter should be string and not empty: baseBid');
    });
    it('should return input data if all data correct', function () {
        return expect(StockValidator.validateRequest('IN', 'Auto', '20')).to.deep.equal(result);
    });

});