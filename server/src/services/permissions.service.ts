import type express = require('express');
import type UserInterface from '../interfaces/user.interface';
import PermissionInterface from '../interfaces/permission.interface';
import { PermissionsEnum } from "../enums";
import apiRequest from '../interfaces/request.interface';
import { Logger } from '../services/utility/logger.service';
const PermissionModel = require('../db/models/permission.schema.ts');
const responseHandler = require('../services/utility/responseHandler.service.ts');

const PermissionService = {
  /**
   * Creates user permission document using Permission schema. Throws an error if object fails validation
   * @param {PermissionInterface} perObject user object that will become user document
  */
  create: async (perObject: PermissionInterface): Promise<PermissionInterface> => {
    try {
      const permission = new PermissionModel(perObject);
      return await permission.create();
    } catch(ex: any) {
      Logger.error(ex)
      throw ex;
    }
  },
  /**
   * Updates user permission document using Permission schema. Throws an error if object fails validation
   * @param {PermissionInterface} perObject user object that will become user document
  */
  update: async (perObject: PermissionInterface): Promise<PermissionInterface> => {
    try {
      const permission = new PermissionModel(perObject);
      return await permission.update();
    } catch(ex: any) {
      Logger.error(ex)
      throw ex;
    }
  },
  /**
   * Validates that the api request can be called by checking the permission collection
   * Returns 401 if invalid
   * Calls next if valid
   * @param {express.Response} response express.response
   * @param {express.Request} request express.request
   * @param {express.next} next express.next
  */
  canCall: async (request: apiRequest, response: express.Response, next: Function): Promise<void> => {
    try{
      let path: string = request.path;
      const user: UserInterface | null = request.user || null;

      // verify that the path they are trying to call exists
      // formats path and returns as string
      // returns a 404 error response if path is invalid
      const trimmedPath: string | null = PermissionService.verifyPath(path);
      if(!trimmedPath) {
        responseHandler.notFound(response, null, "Invalid Path");
      }

      // retrieve permissions for this path
      const apiPermission: PermissionInterface = await PermissionModel.findOne({routeName: trimmedPath, method: request.method});

      // Permission does not exist for this route
      if(!apiPermission){
        return responseHandler.notFound(response, null, "Invalid Path");
      }
      // check to see if the route is currently inactive
      if(!apiPermission.active) {
        responseHandler.notFound(response, null, "Invalid Path");
      }
      // no permissions required to call route, next
      if(apiPermission.permissionLevel === PermissionsEnum.NONE) {
        return next();
      }
      // user not logged in or no permissions, 401
      if(!user || !user.permissionLevel) {
        return responseHandler.notFound(response, null, "Invalid Path");
      }
      // check to see if permission levels match, 401
      if(apiPermission.permissionLevel !== user.permissionLevel) {
        return responseHandler.custom(response, null, "Unauthorized", 401);
      }

      return next();
    }catch(ex: any) {
      Logger.error(ex);
      throw ex;
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
      Logger.error(ex)
      return null;
    }
  }
}

export = PermissionService;