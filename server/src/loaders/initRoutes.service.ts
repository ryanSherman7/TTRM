const PermissionModel = require('../db/models/permission.schema.ts');
const fs = require('fs');
const path = require('path');

export default async function initRoutes(app: any): Promise<void> {
    // import routes
    const apiPrefix: string = '/api';
    const dirPath = path.resolve(__dirname, '../routes');

    // get all folders from the routes directory
    // this corresponds to all the api versions
    var apiVersions = fs.readdirSync(dirPath).filter(function (file: string) {
        return fs.statSync(dirPath+'/'+file).isDirectory();
    });

    apiVersions.map((version: string) => {
        var routeFiles = fs.readdirSync(`${dirPath}/${version}`);

        routeFiles.map((fileName: string) => {
            const route = require(`${dirPath}/${version}/${fileName}`);
            app.use(`${apiPrefix}/${version}`, route);
            PermissionModel.initPermissions(`${apiPrefix}/${version}`, route);
        })
    })
}
// i love mom and dad
// - colette