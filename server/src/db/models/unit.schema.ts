let dbCollection = require('./schema.abstract.ts');

const unitSchema = new dbCollection.dbSchema({
  // reference to the unit's document
  unitId: dbCollection.ObjectId,
});

const model = dbCollection.model('Units', unitSchema);
export = model;