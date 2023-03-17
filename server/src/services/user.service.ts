import UserInterface from '../interfaces/user.interface';
import { Logger } from '../services/utility/logger.service';
import {InvalidRequestError} from '../services/utility/errorHandler.service';
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../db/models/user.schema.ts')
// const events = require('events');
// const eventEmitter = new events.EventEmitter();	

const UserService = {
  /**
   * Queries db and returns user document.
   * @param {object} query query object for mongo db
   * @param {object} options mongodb options for queries
   * @returns {UserInterface} User document that was just created
  */
  get: async (query: object, options: object): Promise<UserInterface> => {
    try {
      return await User.find(query, options);
    } catch(ex: any) {
      Logger.error(ex);
      throw ex;
    }
  },
  /**
   * Queries db and returns user document. Only matches using _id
   * @param {string} id query object for mongo db
   * @param {object} options mongodb options for queries
   * @returns {UserInterface} User document that was just created
  */
  getById: async (id: string, userObject: object, options: object): Promise<UserInterface> => {
    // Validate user id is an Object ID before we make query to DB
    if(!ObjectId.isValid(id)){
      throw new InvalidRequestError("Invalid Id.");
    }

    try {
      return await User.findById(id);
    } catch(ex: any) {
      Logger.error(ex);
      throw ex;
    }
  },
  /**
   * Creates user document using User schema. Throws an error if object fails validation
   * @param {UserInterface} userObject user object that will become user document
   * @returns {UserInterface} User document that was just created
  */
  create: async (userObject: object): Promise<UserInterface> => {
    try {
      const user = new User(userObject);
      return await user.create();
    } catch(ex: any) {
      Logger.error(ex);
      throw ex;
    }
  },
  /**
   * Updates user document using User schema. Throws an error if object fails validation
   * @param {object} query query object for mongo db
   * @param {UserInterface} userObject user object that will become user document
   * @returns {UserInterface} User document that was just created
  */
  update: async (query: object, userObject: object): Promise<UserInterface> => {
    try {
      return await User.updateValidOnly(query, userObject);
    } catch(ex: any) {
      Logger.error(ex);
      throw ex;
    }
  },
  /**
   * Sets active field to true for user
   * @param {string} userId user object that will become user document
   * @returns {UserInterface} User document that was just created
  */
  activate: async (userId: string): Promise<UserInterface> => {
    // Validate user id is an Object ID before we make query to DB
    if(!ObjectId.isValid(userId)){
      throw new InvalidRequestError("Invalid Id.");
    }

    try {
      return await User.updateValidOnly({_id: userId}, {active: true});
    } catch(ex: any) {
      Logger.error(ex);
      throw ex;
    }
  },
  /**
   * Sets active field to false for user
   * @param {string} userId user object that will become user document
   * @returns {UserInterface} User document that was just created
  */
  deactivate: async (userId: string): Promise<void> => {
    // Validate user id is an Object ID before we make query to DB
    if(!ObjectId.isValid(userId)){
      throw new InvalidRequestError("Invalid Id.");
    }

    try {
      return await User.updateValidOnly({_id: userId}, {active: false});
    } catch(ex: any) {
      Logger.error(ex);
      throw ex
    }
  },
  /**
   * Sets active field to false for user
   * @param {string} userId user object that will become user document
  */
  // async signup (user: UserInterface) {
  //   try {
  //     const user: UserInterface = await this.create(user);
  //   } catch(ex: any){
  //     
  //   }
  // }
}

export = UserService;