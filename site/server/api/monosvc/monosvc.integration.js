'use strict';

var app = require('../..');
import request from 'supertest';

var newMonosvc;

describe('Monosvc API:', function() {

  describe('GET /api/monosvc', function() {
    var monosvcs;

    beforeEach(function(done) {
      request(app)
        .get('/api/monosvc')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          monosvcs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(monosvcs).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/monosvc', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/monosvc')
        .send({
          name: 'New Monosvc',
          info: 'This is the brand new monosvc!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMonosvc = res.body;
          done();
        });
    });

    it('should respond with the newly created monosvc', function() {
      expect(newMonosvc.name).to.equal('New Monosvc');
      expect(newMonosvc.info).to.equal('This is the brand new monosvc!!!');
    });

  });

  describe('GET /api/monosvc/:id', function() {
    var monosvc;

    beforeEach(function(done) {
      request(app)
        .get('/api/monosvc/' + newMonosvc._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          monosvc = res.body;
          done();
        });
    });

    afterEach(function() {
      monosvc = {};
    });

    it('should respond with the requested monosvc', function() {
      expect(monosvc.name).to.equal('New Monosvc');
      expect(monosvc.info).to.equal('This is the brand new monosvc!!!');
    });

  });

  describe('PUT /api/monosvc/:id', function() {
    var updatedMonosvc;

    beforeEach(function(done) {
      request(app)
        .put('/api/monosvc/' + newMonosvc._id)
        .send({
          name: 'Updated Monosvc',
          info: 'This is the updated monosvc!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMonosvc = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMonosvc = {};
    });

    it('should respond with the updated monosvc', function() {
      expect(updatedMonosvc.name).to.equal('Updated Monosvc');
      expect(updatedMonosvc.info).to.equal('This is the updated monosvc!!!');
    });

  });

  describe('DELETE /api/monosvc/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/monosvc/' + newMonosvc._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when monosvc does not exist', function(done) {
      request(app)
        .delete('/api/monosvc/' + newMonosvc._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
