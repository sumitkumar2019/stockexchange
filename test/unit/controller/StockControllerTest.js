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
}

var StockService, stockController;

beforeEach('Before Each: Stock Controller', function(){
    StockService = td.replace('../../../main/services/StockService');
    stockController = require('../../../main/controller/StockController');

    td.when(StockService.baseTargeting(td.matchers.anything(), td.matchers.anything())).thenResolve([result]);
    td.when(StockService.budgetCheck(td.matchers.anything())).thenReturn([result]);
    td.when(StockService.baseBidCheck(td.matchers.anything(), td.matchers.anything())).thenReturn([result]);
    td.when(StockService.shortListing(td.matchers.anything())).thenReturn(result);
    td.when(StockService.reduceBudget(td.matchers.anything(), td.matchers.anything())).thenResolve(result);
});

afterEach('After Each: Stock Controller', function(){
 td.reset();
});


describe('get Stocks', function () {

    it('should return stock if company selected', function () {
        return expect(stockController.getStocks({
            country: 'US',
            category:'Automobile',
            baseBid:'20'
        })).to.eventually.be.equal('C1');
    });

    it('should return No Company Passed from Targeting if base targeting fails for all company', function () {
        td.when(StockService.baseTargeting(td.matchers.anything(), td.matchers.anything())).thenResolve([]);
        return expect(stockController.getStocks({
            country: 'US',
            category:'Automobile',
            baseBid:'20'
        })).to.eventually.be.equal('No Company Passed from Targeting');
    });

    it('should return No Company Passed from Budget if budget check fails for all company', function () {
        td.when(StockService.budgetCheck(td.matchers.anything())).thenReturn();
        return expect(stockController.getStocks({
            country: 'US',
            category:'Automobile',
            baseBid:'20'
        })).to.eventually.be.equal('No Company Passed from Budget');
    });

    it('should return No Company Passed from Base Bid check if base bid fails for all company', function () {
        td.when(StockService.baseBidCheck(td.matchers.anything(), td.matchers.anything())).thenReturn();
        return expect(stockController.getStocks({
            country: 'US',
            category:'Automobile',
            baseBid:'20'
        })).to.eventually.be.equal('No Company Passed from BaseBid check');
    });
    it('should return stock after shortlisting from remaining stocks', function () {
        td.when(StockService.shortListing(td.matchers.anything())).thenReturn(result);
        return expect(stockController.getStocks({
            country: 'US',
            category:'Automobile',
            baseBid:'20'
        })).to.eventually.be.equal('C1');
    });
});