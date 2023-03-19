const dbCollection = require('./schema.abstract.ts');
import { Logger } from '../../services/utility/logger.service';
import { PermissionsEnum } from "../../enums";

const permissionModel = new dbCollection.dbSchema({
  routeName: {
    type: String,
    index: true
  },
  active: {
    type: Boolean,
    default: true
  },
  permissionLevel: {
    type: String,
    enum: PermissionsEnum.types
  },
  method: {
    type: String,
    enum: PermissionsEnum.methods
  }
});

const model = dbCollection.model('Permissions', permissionModel);

model.initPermissions = (apiPrefix: string, route: any): void => {
  try{
    if(route && route.stack) {
      route.stack.map(async (endpoint: any): Promise<void> => {
        // trim out any thing added after the path
        let trimmedPath: any = endpoint?.route?.path?.replace(/\/:.*$/, '');
        if(!trimmedPath) {
          Logger.error(`Could not init permissions for ${endpoint?.route?.path}`);
          return;
        }
        const fullRoute: string = apiPrefix + trimmedPath;

        const methods = Object.keys(endpoint.route.methods);
        methods.map(async (method) => {
          method = method.toUpperCase();
          const permission = await model.findOne({routeName: fullRoute, method: method});
          if(!permission){
            // We do not have any permissions setup for this route
            // Create a new set of permissions for this route
            Logger.log(`Initiating permissions for ${fullRoute}`);
  
            const newPermission = await model({
              routeName: fullRoute,
              method: method,
              permissionLevel: PermissionsEnum.ADMIN
            });
            Logger.log(newPermission);
            newPermission.create();
          }
        })
      });
    }
  } catch(ex: any) {
    Logger.error(ex);
  }
}
export = model;