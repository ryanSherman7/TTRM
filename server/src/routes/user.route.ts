import express = require('express');
const router = express.Router();
const responseHandler = require('../services/responseHandler.service.ts');
const User = require('../db/models/user.schema.ts')
const logger = require('../services/logger.service.ts');

router.post('/user/create', async (request: express.Request, response: express.Response) => {
  try {
    const user = new User(request.body);
    const userDoc = await user.create();

    responseHandler.success(response, userDoc, "User created.");
  } catch (ex: any) {
    logger.error(ex)
    responseHandler.error(response, null, ex.message)
  }
});

// router.post('/user/update', (request: express.Request, response: express.Response) => {

//   responseHandler.success(response, null, "User updated.");
// });

// router.post('/user/deactivate', (request: express.Request, response: express.Response) => {

//   responseHandler.success(response, null, "User deactivated.");
// });

// router.post('/user/login', (request: express.Request, response: express.Response) => {

//   responseHandler.success(response, null, "User login accepted.");
// });

export = router