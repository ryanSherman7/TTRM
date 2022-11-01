let dbCollection = require('./schema.abstract.ts');

/*
  COLLECTION_UNITS

  Unit schema for collections. Differs from the standalone unit schema that contains unit information.
  This schema is used to contain personalized information about the user's models.
*/
const unitSchema = new dbCollection.dbSchema({
  // reference to the unit's document
  unitId: dbCollection.ObjectId,
  // user's name of the unit
  name: {
    type: String,
    trim: true
  },
  // description of this unit
  description: {
    type: String
  },
  // description of how this unit was painted
  paintDescription: {
    type: String
  },
  // total number of models in the unit
  numberOfModels: {
    type: Number
  },
  // how many models in the unit are painted?
  numberPainted: {
    type: Number
  },
  // how many models in the unit are assembled?
  numberAssembled: {
    type: Number
  },
  // when the unit was purchased
  purchaseDate: {
    type: Date
  },
  // how much the user paid for the models
  purchasePrice: {
    type: Number
  },
  // is the user looking to trade this unit?
  forTrade: {
    type: Boolean
  },
  // is this unit
  forSale: {
    type: Boolean
  },
  // stored as cents
  salePrice: {
    type: Number
  },
  // id of an image upload for the model(s)
  imageId: {
    type: dbCollection.ObjectId
  },
  // is the unit 3d printed?
  threeDPrinted: {
    type: Boolean
  },
  // link(s) to the stl so they can share with other people
  stlLink: [{
    type: String
  }],
  // is the unit a third party model?
  thirdParty: {
    type: Boolean
  },
  // link(s) to where they bought the model(s)
  modelLink: [{
    type: String
  }]
})

/*
  COLLECTIONS

  This schema contains all the information about a user's collection. 
  A collection is most likely a group of units with the same faction,
  but I am leaving it ambiguous for future changes.
*/
const collectionSchema = new dbCollection.dbSchema({
  // user's name for their collection
  name: {
    type: String,
    required: true
  },
  // name of the faction
  factionName: {
    type: String,
    required: true
  },
  game: {
    type: String
  },
  // description of this collection
  description: {
    type: String
  },
  ownerId: {
    type: dbCollection.ObjectId,
    required: true
  },
  // array of image ids for this collection
  images: [dbCollection.ObjectId],
  // images used as the inspiraton for this collection
  conceptArt: [dbCollection.ObjectId],
  units: [unitSchema]
}, {
  timestamps: {
    createdDate: 'createdDate',
    lastModifiedDate: 'lastModifiedDate'
  }
})

/* 
  collection methods
*/
collectionSchema.methods.create = function(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      await this.validate();
      resolve(await this.save());
    } catch (ex) {
      reject(ex);
    }
  });
}
collectionSchema.methods.getImages = function(): Array<any> {
  return this.images;
}
collectionSchema.methods.getConceptArt = function(): Array<any> {
  return this.conceptArt;
}
collectionSchema.methods.getUnits = function(): Array<any> {
  return this.units;
}
/*
  END OF COLLECTION SCHEMA
*/
const model = dbCollection.model('Collections', collectionSchema);
export = model;