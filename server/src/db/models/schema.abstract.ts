const mongoose = require('mongoose');

// collection schema
const dbSchema = function(values: object): any {
  return new mongoose.Schema(values, {
    timestamps: {
      createdDate: 'createdDate',
      lastModifiedDate: 'lastModifiedDate'
    }
  });
};

// additional data types
const ObjectId = mongoose.Schema.Types.ObjectId;

// colelciton model
function model(collectionName: string, schema: Object) {
  return mongoose.model(collectionName, schema);
}

export { dbSchema, model, ObjectId }
