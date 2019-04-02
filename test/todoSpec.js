const assert = require('assert');
const db = require('../db/db');
const supertest = require('supertest');
const should = require('should');
const rewire = require('rewire');

const app = rewire('../app').app;


describe('GET "/"', function () {
    it('loads home page', function (done) {
        supertest(app).get('/').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});


// describe('route to note', function () {
//     it('should return valid route', function (done) {
//         supertest(app)
//             .get('/')
//             .expect(200)
//             .end(function (err, res) {
//                 res.status.equal(200);
//                 done();
//             })
//     });
// });