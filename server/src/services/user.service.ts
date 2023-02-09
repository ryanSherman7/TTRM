import type express = require('express');
const ObjectId = require('mongoose').Types.ObjectId;
const responseHandler = require('../services/responseHandler.service.ts');
const User = require('../db/models/user.schema.ts')
const logger = require('../services/logger.service.ts');

const UserService = {
    /**
     * Creates user document using User schema. Throws an error if object fails validation
     * @param {object} userObject user object that will become user document
     * @param {express.response} response express.response
    */
    create: async (userObject: object, response: express.Response): Promise<void> => {
        try {
            const user = new User(userObject);
            const userDoc = await user.create();
        
            responseHandler.success(response, userDoc, "User created.");
        } catch(ex: any) {
            logger.error(ex)
            responseHandler.error(response, null, ex.message)
        }
    },
    /**
     * Sets active field to true for user
     * @param {string} userId user object that will become user document
     * @param {express.response} response express.response
    */
    activate: async (userId: string, response: express.Response): Promise<void> => {
        try {
            // Validate user id is an Object ID before we make query to DB
            if(!ObjectId.isValid(userId)){
              responseHandler.badRequest(response, null, "Invalid Id.")
            }
        
            const user = await User.findOneAndUpdate(
              {
                _id: userId
              },{
                active: true
              },{
                new: true
              })

            responseHandler.success(response, user, "User deactivated.");
          } catch(ex: any) {
            logger.error(ex)
            responseHandler.error(response, null, ex.message)
          }
    },
    /**
     * Sets active field to tfalserue for user
     * @param {string} userId user object that will become user document
     * @param {express.response} response express.response
    */
    deactivate: async (userId: string, response: express.Response): Promise<void> => {
        try {
            // Validate user id is an Object ID before we make query to DB
            if(!ObjectId.isValid(userId)){
              responseHandler.badRequest(response, null, "Invalid Id.")
            }

            const user = await User.findOneAndUpdate({
              _id: userId
            },{
              active: false
            },{
              new: true
            })

            responseHandler.success(response, user, "User deactivated.");
        } catch(ex){

        }
    }
}

export = UserService;