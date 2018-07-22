var chai = require('chai');
var td = require('testdouble');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var knex, StockDao;

const result ={
    companyId:'C1',
    countries:'US, FR',
    budget:'1$',
    bid:'10 cent',
    category:'Automobile, Finance'
}
beforeEach('Before Each: Stock Dao', function(){
    knex = td.replace('../../../db/knex');
    StockDao = require('../../../main/model/StockDao');

    td.when(knex(td.matchers.anything())).thenReturn(knex);
    td.when(knex.where(td.matchers.anything(),td.matchers.anything())).thenReturn(knex);
    td.when(knex.update(td.matchers.anything(),td.matchers.anything())).thenResolve(td.matchers.anything());
    td.when(knex.select()).thenResolve([result]);
});
afterEach('After Each: Stock Dao', function(){
    td.reset();
});

describe('get All Stocks', function () {

    it('should return null if no data', function () {
        td.when(knex.select()).thenResolve([]);
        return expect(StockDao.getAllStocks()).to.eventually.be.deep.equal([]);
    });

    it('should return result if data found', function () {
        return expect(StockDao.getAllStocks()).to.eventually.be.deep.equal([result]);
    });

    it('should throw error if query fails', function () {
        td.when(knex.select()).thenThrow('Db Error');
        expect(()=> StockDao.getAllStocks()).to.throw('Db Error');
    });

});

describe('Update Stock', function () {

    it('should return if update', function () {
        return expect(StockDao.updateStock(result)).to.eventually.be.deep.equal(result);
    });

    it('should return if no update', function () {
        return expect(StockDao.updateStock(result)).to.eventually.be.deep.equal(result);
    });

    it('should throw error if query fails', function () {
        td.when(knex.update(td.matchers.anything(),td.matchers.anything())).thenThrow('DB Error');
        expect(()=> StockDao.updateStock(result)).to.throw('DB Error');
    });

});