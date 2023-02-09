import type express = require('express');
import { PermissionsEnum } from "../enums";
const PermissionModel = require('../db/models/permission.schema.ts');
const responseHandler = require('../services/responseHandler.service.ts'); 
const logger = require('../services/logger.service.ts');
const PermissionService = {
    /**
     * Creates user permission document using Permission schema. Throws an error if object fails validation
     * @param {object} perObject user object that will become user document
     * @param {express.response} response express.response
    */
    create: async (perObject: object, response: express.Response): Promise<void> => {
      try {
          const permission = new PermissionModel(perObject);
          const permissionDoc = await permission.create();
      
          responseHandler.success(response, permissionDoc, "Permission created.");
      } catch(ex: any) {
          logger.error(ex)
          responseHandler.error(response, null, ex.message)
      }
    },
    /**
     * Validates that the api request can be called by checking the permission collection
     * @param {express.response} response express.response
     * @param {express.request} request express.request
     * @param {express.next} next express.next
    */
    canCall: async (request: any, response: any, next: any): Promise<void> => {
      try{
        let path: string = request.path;
        const user: Object = request.user;
        if(!path) {
          responseHandler.custom(response, null, "Invalid Path", 404);
        }

        let trimmedPath: any = path.match(/^(.*)[\\\/]/);
        if(!trimmedPath) {
          responseHandler.custom(response, null, "Invalid Path", 404);
        }
        trimmedPath = trimmedPath[1];
      
        const permission = await PermissionModel.findOne({routeName: trimmedPath});
        // Permission does not exist for this route
        if(!permission){
          responseHandler.custom(response, null, "Unauthorized", 401);
        }

        // check to see if user has correct access
        let invalid = false;
        // switch(permission.permissionLevel) {
        //   case PermissionsEnum.ADMIN: {
        //     if(user.permissionLevel !== PermissionsEnum.ADMIN) {
        //       invalid = true;
        //     }
        //   } break;
        //   case PermissionsEnum.MOD: break;
        //   case PermissionsEnum.USER: break;
        //   case PermissionsEnum.NONE: break;
        //   default: 
        // }
        console.log(user)

        next();
      }catch(ex: any) {
        logger.error(ex)
        responseHandler.error(response, null, ex.message)
      }
    },
    verifyAdmin: async () => {

    }
    // validateNone: (response)
}

export = PermissionService;