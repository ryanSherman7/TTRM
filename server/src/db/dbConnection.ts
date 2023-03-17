const { MongoClient } = require("mongodb");
import {Logger}  from '../../src/services/utility/logger.service';
const mongoose = require('mongoose');

const dbUri = process.env.ATLAS_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const client = new MongoClient(dbUri, options);
let _db: any;

export = {
  connectToServer: function(callback: Function) {
    client.connect(function(err: Error, db: any) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db("ttrm");
        mongoose.connect(dbUri, options);
        Logger.info("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },
  getDb: function() {
    return _db;
  }
};