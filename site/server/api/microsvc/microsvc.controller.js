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
import Microsvc from './microsvc.model';
import util from 'util';
import publisher from '../../lib/bus/publisher';



// Gets a list of Monosvcs
export function index(req, res) {
  console.log ('[GET /api/microsvc/] ....Trying to retrieve all content');
  return Microsvc.find().exec()
    .then(e=>{
      console.log ('[GET /api/microsvc/] ...Result: '+e);
      res.status(200).json(e);
    })
    .catch(handleError(res));
}

// Creates a new Monosvc in the DB
export function create(req, res) {
  if (isEmpty(req.body)) {
    res.status(400).send("Please send data");
    return;
  }

  console.log ('[POST /api/microsvc/] .... Trying to save the following content: '+ req.body);
  //1. UploadImage
  let startDate = new Date();
  let entity =req.body;
  let id;

  uploadImage(entity)
    .then(e => {
      id = e._id;
      publisher.sendBroadcastMessage ('image.uploaded',id);
      res.status(200).end();
    })
}

function uploadImage(entity) {
  return Microsvc.create(entity)
    .then(e => {
      return sleep(300, () => {
        console.log('Image uploaded.. '+ e);
        return e;
      });
    });
}


function sleep(time, work) {
  return new Promise(r => {
    setTimeout(function () {
      let result = null;
      if (work)
        result = work();
      r(result);
    }, time);
  })
}

function isEmpty(obj) {
  console.log('Checking empty object ' + util.inspect(obj, { showHidden: false, depth: null }));
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}



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


// Gets a single Monosvc from the DB
export function show(req, res) {
  return Microsvc.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}