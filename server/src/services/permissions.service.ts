import type express = require('express');
import type User from '../interfaces/user.interface';
import { PermissionsEnum } from "../enums";
import type Permission from '../interfaces/permission.interface';
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
    update: async (perObject: object, response: express.Response): Promise<void> => {
      try {
          const permission = new PermissionModel(perObject);
          const permissionDoc = await permission.update();
      
          responseHandler.success(response, permissionDoc, "Permission updated.");
      } catch(ex: any) {
          logger.error(ex)
          responseHandler.error(response, null, ex.message)
      }
    },
    /**
     * Validates that the api request can be called by checking the permission collection
     * Returns 401 if invalid
     * Calls next if valid
     * @param {express.response} response express.response
     * @param {express.request} request express.request
     * @param {express.next} next express.next
    */
    canCall: async (request: any, response: any, next: any): Promise<void> => {
      try{
        let path: string = request.path;
        const user: User = request.user;

        // verify that the path they are trying to call exists
        // formats path and returns as string
        // returns a 404 error response if path is invalid
        const trimmedPath: string | null = PermissionService.verifyPath(path);
        if(!trimmedPath) {
          responseHandler.custom(response, null, "Invalid Path", 404);
        }

        // retrieve permissions for this path
        const apiPermission: Permission = await PermissionModel.findOne({routeName: trimmedPath});

        // Permission does not exist for this route
        if(!apiPermission){
          return responseHandler.custom(response, null, "Unauthorized", 401);
        }
        // check to see if the route is currently inactive
        if(!apiPermission.active) {
          return responseHandler.custom(response, null, "Forbidden", 403);
        }
        // no permissions required to call route, next
        if(apiPermission.permissionLevel === PermissionsEnum.NONE) {
          return next();
        }
        // user not logged in or no permissions, 401
        if(!user || !user.permissionLevel) {
          return responseHandler.custom(response, null, "Unauthorized", 401);
        }
        // check to see if permission levels match, 401
        if(apiPermission.permissionLevel !== user.permissionLevel) {
          return responseHandler.custom(response, null, "Unauthorized", 401);
        }

        return next();
      }catch(ex: any) {
        logger.error(ex)
        return responseHandler.error(response, null, ex.message)
      }
    },
    /**
     * Validates that the api path is valid
     * Returns null if invalid
     * Returns formatted path if valid
     * @param {string} path api path
    */
    verifyPath: (path: string): string | null => {
      try{
        if(!path) {
          return null;
        }

        let trimmedPath: any = path.match(/^(.*)[\\\/]/);
        if(!trimmedPath) {
          return null;
        }

        return trimmedPath[1];
      }catch(ex: any) {
        logger.error(ex)
        return null;
      }
    }
}

export = PermissionService;