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
            let stars = Math.floor(Math.random() * 5) + 1;
            console.log('new stars value = ' + stars);
            return db.collection('monosvcs').findAndModify({ _id: new mongo.ObjectID(id) }, [], { $set: { stars: stars } }, { new: true });
        })
        .then(item => {
            console.log('Document updated ->'+item);
            return item;
        });
}

exports.updateData = updateData;