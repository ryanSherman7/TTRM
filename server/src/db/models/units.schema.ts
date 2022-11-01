const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

module.exports = Mongoose.model('Collections', new Schema({
  // reference to the unit's document
  unitId: Mongoose.Schema.Types.ObjectId,
}, {
  timestamps: {
    createdDate: 'createdDate',
    lastModifiedDate: 'lastModifiedDate'
  }
}))