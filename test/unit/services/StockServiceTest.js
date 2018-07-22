var chai = require('chai');
var td = require('testdouble');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const result ={
    companyId:'C1',
    countries:'US, FR',
    budget:'1$',
    bid:'10 cent',
    category:'Automobile, Finance'
};

var StockDao = td.replace('../../../main/model/StockDao');
var StockService = require('../../../main/services/StockService');

beforeEach('Before Each: Stock Service', function(){

    td.when(StockDao.getAllStocks()).thenResolve([result]);
    td.when(StockDao.updateStock(td.matchers.anything())).thenReturn(result);
});
afterEach('After Each: Stock Service', function(){
    td.reset();
});
describe('base Targeting', function () {

    it('should return null if no stock', function () {
        td.when(StockDao.getAllStocks()).thenResolve([]);
        return expect(StockService.baseTargeting('US', 'Automobile'))
            .to.eventually.be.deep.equal([]);
    });

    it('should return null if no category no country', function () {
        td.when(StockDao.getAllStocks()).thenResolve([result]);
        return expect(StockService.baseTargeting(undefined, undefined))
            .to.eventually.be.deep.equal([]);
    });

    it('should return result if stock found by country', function () {
        return expect(StockService.baseTargeting('US', undefined))
            .to.eventually.be.deep.equal([result]);
    });

    it('should return result if stock found by category', function () {
        return expect(StockService.baseTargeting(undefined, 'Automobile'))
            .to.eventually.be.deep.equal([result]);
    });

    it('should return result if stock found by country & category', function () {
        return expect(StockService.baseTargeting('US', 'Automobile'))
            .to.eventually.be.deep.equal([result]);
    });

    it('should return null if stock not found by either by country or category', function () {
        return expect(StockService.baseTargeting('Test', 'Test'))
            .to.eventually.be.deep.equal([]);
    });

});

describe('budget Check', function () {

    it('should return null if budget is empty', function () {
        return expect(StockService.budgetCheck([{
            companyId:'C1',
            countries:'US, FR',
            category:'Automobile, Finance'
        }])).to.be.deep.equal([]);
    });

    it('should return stocks if budget is not empty', function () {
        return expect(StockService.budgetCheck([result])).to.be.deep.equal([result]);
    });

    it('should return empty if stocks is empty', function () {
        return expect(StockService.budgetCheck(undefined)).to.be.deep.equal([]);
    });

});

describe('base Bid Check', function () {

    it('should return null if stock bid is empty', function () {
        return expect(StockService.baseBidCheck([{
            companyId:'C1',
            countries:'US, FR',
            category:'Automobile, Finance'
        }], 20)).to.be.deep.equal([]);
    });

    it('should return null if stock bid is not empty but bid is less than baseBid', function () {
        return expect(StockService.baseBidCheck([result], 5)).to.be.deep.equal([]);
    });

    it('should return stock if stock bid is not empty but bid is more than baseBid', function () {
        return expect(StockService.baseBidCheck([result], 20)).to.be.deep.equal([result]);
    });

});

describe('Short Listing stocks', function () {

    it('should return null if stocks are empty', function () {
        return expect(StockService.shortListing([])).to.be.null;
    });

    it('should return highest stock if multiple stock are there', function () {
        return expect(StockService.shortListing([result])).to.be.deep.equal(result);
    });
});


describe('reduce budget', function () {

    it('should return null if stocks are empty', function () {
        return expect(StockService.reduceBudget(null,10)).to.be.null;
    });
    it('should return stock if bid is empty', function () {
        return expect(StockService.reduceBudget(result,null)).to.be.deep.equal(result);
    });
    it('should update if bid and stock is not empty', function () {
        return expect(StockService.reduceBudget({budget:'10$'}, '8')).to.be.deep.equal(result);
    });

});

