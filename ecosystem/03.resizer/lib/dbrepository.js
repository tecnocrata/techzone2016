'use strict'
var config = require('../config');
var mongo = require('mongodb');
var client = mongo.MongoClient
//var url = 'mongodb://localhost:27017/example'
var url = config.mongodbURL;
var connection = client.connect(url);
/*.then(function (db) { // <- db as first argument
  console.log(db)
})
.catch(function (err) {})*/

function updateData(id) {
    return connection
        .then(db => {
            console.log('Updating user notified into db....');
            return db.collection('microsvcs').findAndModify({ _id: new mongo.ObjectID(id) }, [], { $set: { resized: true } }, { new: true });
        })
        .then(item => {
            console.log('Document updated ->'+item);
            return item;
        });
}

exports.updateData = updateData;