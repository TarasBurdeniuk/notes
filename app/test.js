const assert = require('assert');
const supertest = require('supertest');
const app = require('./index.js');
const chai = require('chai');

const expect = chai.expect;

describe('API tests', function () {
    describe('routes GET', function () {
        this.timeout(5000);

        it('load home page', function (done) {
            supertest(app)
                .get('/')
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    done();
                });
        });

        it('route /notes', function (done) {
            supertest(app)
                .get('/notes')
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    done();
                });
        });

        it('route /lists', function (done) {
            supertest(app)
                .get('/lists')
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    done();
                });
        });
    });

    describe('routes POST', function () {
        this.timeout(5000);

        it('route /notes', function (done) {
            supertest(app)
                .post('/notes')
                .set('Accept', 'application/json')
                .send({
                    title: 'test mocha',
                    description: 'testing route'
                })
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    done();
                })
        });

        it('route /lists', function (done) {
            supertest(app)
                .post('/lists')
                .set('Accept', 'application/json')
                .send({
                    title: 'test mocha',
                    text: ['testing', 'route', 'lists'],
                    classlist: ['checked', 'checked', 'checked']
                })
                .expect(200, done);
        });
    });

    describe('routes DELETE', function () {
        this.timeout(5000);

        it('route /notes/:id', function () {
            return supertest(app)
                .delete('/notes/:id')
                .then(function (response) {
                    assert.equal(response.status, 200)
                })
        });

        it('route /lists/:id', function (done) {
            supertest(app)
                .delete('/lists/:id')
                .expect(200, done);
        });
    });

    describe('routes PUT', function () {
        this.timeout(5000);

        it('route /notes/:id', function (done) {
            supertest(app)
                .put('/notes/:id')
                .set('Accept', 'application/json')
                .send({
                    title: 'test mocha',
                    description: 'testing route'
                })
                .expect(200, done);
        });

        it('route /lists/:id', function (done) {
            supertest(app)
                .put('/lists/:id')
                .set('Accept', 'application/json')
                .send({
                    title: 'test mocha',
                    text: ['testing', 'route', 'lists'],
                    classlist: ['checked', 'checked', 'checked']
                })
                .expect(200, done);
        });
    });
});