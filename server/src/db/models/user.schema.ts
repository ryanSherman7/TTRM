let dbCollection = require('./schema.abstract.ts');
import { PermissionsEnum } from "../../enums";

var validateEmail = function(email: string) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const userSchema = new dbCollection.dbSchema({
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail, 'Please enter a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  recoveryEmail: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail, 'Please enter a valid email address'],
    index: true,
    sparse: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  lastLogin: {
    type: Date
  },
  permissionLevel: {
    type: String,
    enum: PermissionsEnum.types
  }
});

const model = dbCollection.model('Users', userSchema);
export = model;