/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/monosvc              ->  index
 * POST    /api/monosvc              ->  create
 * GET     /api/monosvc/:id          ->  show
 * PUT     /api/monosvc/:id          ->  update
 * DELETE  /api/monosvc/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Monosvc from './monosvc.model';
import util from 'util';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Monosvcs
export function index(req, res) {
  return Monosvc.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Monosvc from the DB
export function show(req, res) {
  return Monosvc.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Monosvc in the DB
export function create(req, res) {
  if (isEmpty(req.body)) {
    res.status(400).send("Please send data");
    return;
  }
  let startDate = Date.now();
  setTimeout(function () {
    console.log('delay 1000 ms');
    let endDate = Date.now();
    res.status(200).json({ start: startDate, end: endDate });
  }, 3000);
  /*return Monosvc.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));*/
}

function isEmpty(obj) {
  console.log('Checking empty object '  + util.inspect(obj, { showHidden: false, depth: null }));
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function delay() {

}

// Updates an existing Monosvc in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Monosvc.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Monosvc from the DB
export function destroy(req, res) {
  return Monosvc.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
