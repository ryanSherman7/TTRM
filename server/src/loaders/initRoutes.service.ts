const PermissionModel = require('../db/models/permission.schema.ts');
const fs = require('fs');
const path = require('path');

export default async function initRoutes(app: any): Promise<void> {
    // import routes
    const apiPrefix: string = '/api/v1';
    const dirPath = path.resolve(__dirname, '../routes');
    var routeFiles = fs.readdirSync(dirPath);

    // needs some work
    routeFiles.map((fileName: string) => {
        const route = require(`${dirPath}/${fileName}`);
        app.use(apiPrefix, route);
        PermissionModel.initPermissions(apiPrefix, route);
    })
}