let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

describe('Stocks', () => {

    describe('/GET Stocks', () => {
        it('it should GET all the stocks as per category, country and bid', (done) => {
            chai.request(server)
                .get('/stocks')
                .query({country: '10', category: '10', baseBid:'20'})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;
                    expect(res.body).to.exist;
                    expect(res.text).to.equal('No Company Passed from Targeting');
                    done();
                });
        });
    });

    describe('/GET Stocks', () => {
        it('it should GET Error when category not provided', (done) => {
            chai.request(server)
                .get('/stocks')
                .query({country: 'foo', baseBid:'20'})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;
                    expect(res.body).to.exist;
                    expect(res.text).to.equal('Error Msg: required parameter missing: category');
                    done();
                });
        });
    });

    describe('/GET Stocks', () => {
        it('it should GET Error when country not provided', (done) => {
            chai.request(server)
                .get('/stocks')
                .query({category: '10', baseBid:'20'})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;
                    expect(res.body).to.exist;
                    expect(res.text).to.equal('Error Msg: required parameter missing: country');
                    done();
                });
        });
    });

    describe('/GET Stocks', () => {
        it('it should GET Error when baseBid not provided', (done) => {
            chai.request(server)
                .get('/stocks')
                .query({country: 'foo', category: '10'})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;
                    expect(res.body).to.exist;
                    expect(res.text).to.equal('Error Msg: required parameter missing: bid');
                    done();
                });
        });
    });

});