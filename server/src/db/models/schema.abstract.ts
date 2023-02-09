const mongoose = require('mongoose');
import {Schema} from 'mongoose';

// collection schema
const dbSchema = function(values: object): Schema {
  return new mongoose.Schema(values, {
    timestamps: {
      createdDate: 'createdDate',
      lastModifiedDate: 'lastModifiedDate'
    }
  });
};

dbSchema.prototype.create = function(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      await this.validate();
      resolve(await this.save());
    } catch (ex) {
      reject(ex);
    }
  });
}

// additional data types
const ObjectId = mongoose.Schema.Types.ObjectId;

const create = function(this:any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      await this.validate();
      resolve(await this.save());
    } catch (ex) {
      reject(ex);
    }
  });
}
const update = create;

// collection model
function model(collectionName: string, schema: Object) {
  const dbModel = mongoose.model(collectionName, schema);
  dbModel.prototype.create = create;
  dbModel.prototype.update = update;

  return dbModel;
}

export { dbSchema, model, ObjectId }
