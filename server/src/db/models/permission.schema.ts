const dbCollection = require('./schema.abstract.ts');
const logger = require('../../services/logger.service.ts');
import { PermissionsEnum } from "../../enums";
import type express = require('express');

const permissionModel = new dbCollection.dbSchema({
  routeName: {
    type: String,
  },
  permissionLevel: {
    type: String,
    enum: PermissionsEnum.types
  }
});

const model = dbCollection.model('Permissions', permissionModel);
// permissionModel.methods.create = function(): Promise<any> {
//   return new Promise(async (resolve, reject) => {
//     try {
//       await this.validate();
//       resolve(await this.save());
//     } catch (ex) {
//       reject(ex);
//     }
//   });
// }

model.initPermissions = (apiPrefix: string, route: any): void => {
  try{
    if(route && route.stack) {
      route.stack.map(async (endpoint: any): Promise<void> => {
        // trim out any thing added after the path
        let trimmedPath: any = endpoint?.route?.path?.replace(/\/:.*$/, '');
        if(!trimmedPath) {
          logger.error(`Could not init permissions for ${endpoint?.route?.path}`);
          return;
        }
        const fullRoute: string = apiPrefix + trimmedPath;
        const permission = await model.findOne({routeName: fullRoute});
        if(!permission){
          // We do not have any permissions setup for this route
          // Create a new set of permissions for this route
          logger.log(`Initiating permissions for ${fullRoute}`);

          const newPermission = await model({
            routeName: fullRoute,
            permissionLevel: PermissionsEnum.ADMIN
          });
          console.log(newPermission)
          newPermission.create();
        }
      });
    }
  } catch(ex) {
    logger.error(ex);
  }
}
export = model;