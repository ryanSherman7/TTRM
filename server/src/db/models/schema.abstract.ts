const mongoose = require('mongoose');
import {Schema} from 'mongoose';

// collection schema
const dbSchema = function(values: object): Schema {
  const schema = new mongoose.Schema(values, {
    timestamps: {
      createdDate: 'createdDate',
      lastModifiedDate: 'lastModifiedDate'
    }
  });
  return schema;
};

// additional data types
const ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * Queries db and returns user document. Only matches using _id
 * @param {object} query query object for mongo db
 * @param {object} options mongodb options for queries
 * @returns {UserInterface} User document that was just created
*/
const find = function(this:any, query: object, options: any = {}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await this.findOne(query, options));
    } catch (ex) {
      reject(ex);
    }
  });
}

/**
 * Queries db and returns user document. Only matches using _id
 * @param {object} query query object for mongo db
 * @param {object} options mongodb options for queries
 * @returns {UserInterface} User document that was just created
*/
const findById = function(this:any, id: typeof ObjectId, options: any = {}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await this.findOne({_id: id}, options));
    } catch (ex) {
      reject(ex);
    }
  });
}

/**
 * Updates a document
 * @param {object} query query used to find the document to update
 * @param {object} updateObj object that contains the changes to the document
 * @param {object} options any additional options
 * @returns {UserInterface} User document that was just updated
*/
const update = function(this:any, query: any, updateObj: any, options: any = {new: true}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await this.updateOne(query, updateObj, options));
    } catch (ex) {
      reject(ex);
    }
  });
}

/**
 * Updates a document only if it passes the schema validation
 * @param {object} query query used to find the document to update
 * @param {object} updateObj object that contains the changes to the document
 * @returns {UserInterface} User document that was just updated
*/
const updateValidOnly = function(this:any, query: any, updateObj: any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const document = await this.findOne(query);
      if(!document){
        throw "No matching document not found"
      }

      for (const key in updateObj) {
        if (updateObj.hasOwnProperty(key)) {
          document[key] = updateObj[key];
        }
      } 

      resolve(await new this(document).save());
    } catch (ex) {
      reject(ex);
    }
  });
}

// uses mongoose to validate and save db document
const create = function(this:any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await this.save());
    } catch (ex) {
      reject(ex);
    }
  });
}

// collection model
function model(collectionName: string, schema: any) {
  const dbModel = mongoose.model(collectionName, schema);
  dbModel.prototype.create = create;

  dbModel.update = update;
  dbModel.updateValidOnly = updateValidOnly;
  dbModel.findById = findById;
  dbModel.find = find;
  return dbModel;
}

export { dbSchema, model, ObjectId }
