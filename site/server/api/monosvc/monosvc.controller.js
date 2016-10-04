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

  //1. UploadImage
  let startDate = new Date();
  /*sleep(1000, () => {
    let endDate = new Date();
    res.status(200).json({ start: startDate.toISOString(), end: endDate.toISOString() });
  });*/

  uploadImage()
  .then (()=>{
    //res.status(200).json({ start: startDate.toISOString(), end: endDate.toISOString() });
    return notifyUser();
  })
  .then (()=>{
    let endDate = new Date();
    res.status(200).json({ start: startDate.toISOString(), end: endDate.toISOString() });
  })
  .catch((err)=>{
    console.log ('Unexpected error '+err);
    res.status (402).send (err);
  })


  //2. Product Owner: Notify User
  //3. Social Media Advisor: Give Badges to Each User for each UploadImage
  //4. Data Base Admin: Resize images!
  //5. Product Owner: Tweet the images
}

function uploadImage(){
  return sleep(300, () => {
    console.log ('Image upload!');
  });
}

function notifyUser(){
  return sleep(500, () => {
    console.log ('Email sent to user');
  });
}

function resizeImage(){
  return sleep(600, () => {
    console.log ('Image resized');
  });
}

function tweetMessage(){
  return sleep(400, () => {
    console.log ('Message tweeted');
  });
}


function sleep(time, work) {
  return new Promise(r => {
    setTimeout(function () {
      if (work)
        work();
      r();
    }, time);
  })
}

function isEmpty(obj) {
  console.log('Checking empty object ' + util.inspect(obj, { showHidden: false, depth: null }));
  return Object.keys(obj).length === 0 && obj.constructor === Object;
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
