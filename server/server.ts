import initRoutes from './src/loaders/initRoutes.service';
import ValidationService from './src/services/utility/validation.service';
import {Logger} from './src/services/utility/logger.service';
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const PermissionService = require('./src/services/permissions.service.ts');
const responseHandler = require('./src/services/utility/responseHandler.service.ts');

// load our environment variables
(function() {
  const dotenv = require('dotenv');
  const result = dotenv.config({
    path: 'config.env'
  });
  if (result.error) {
    Logger.error("Warning: Starting server WITHOUT .env file")
  }
})();

// middleware functions
initRoutes(app);
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(PermissionService.canCall);
app.use(ValidationService.validateParameters);
// this should be the last middleware that we add,
// it handles all errors, passed by calling next(ex)
app.use(responseHandler.processError);

// connect to our DB
const dbo = require("./src/db/dbConnection");

// start the application
const port = process.env.PORT || 5000;
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function(err: Error) {
    if (err){
      Logger.error(err);
    }
  });
  Logger.log(`TTRM server is running on port: ${port}`);
});
