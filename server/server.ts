const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const logger = require('./src/services/logger.service.ts');
const PermissionService = require('./src/services/permissions.service.ts');
import initRoutes from './src/loaders/initRoutes.service';

// load our environment variables
(function() {
  const dotenv = require('dotenv');
  const result = dotenv.config({
    path: 'config.env'
  });
  if (result.error) {
    logger.error("Warning: Starting server WITHOUT .env file")
  }
})();

// middleware function that verifies that user can call API endpoint
app.use(PermissionService.canCall);
// initiates all api routes and creates permissions for each if they do not exist
initRoutes(app);
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// connect to our DB
const dbo = require("./src/db/dbConnection");

// start the application
const port = process.env.PORT || 5000;
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function(err: Error) {
    if (err) logger.error(err);
  });
  logger.log(`TTRM server is running on port: ${port}`);
});
