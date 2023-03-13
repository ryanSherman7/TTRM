import express = require('express');
import apiRequest from '../interfaces/request.interface';
const router = express.Router();
const responseHandler = require('../services/responseHandler.service.ts');
const UserService = require('../services/user.service.ts')
const logger = require('../services/logger.service.ts');

router.get('/user/:id', async (request: apiRequest, response: express.Response) => {
  try {
    UserService.get(request.body, response);
  } catch (ex: any) {
    logger.error(ex)
    responseHandler.error(response, null, ex.message)
  }
});

router.post('/user/create', async (request: apiRequest, response: express.Response) => {
  try {
    UserService.create(request.body, response);
  } catch (ex: any) {
    logger.error(ex)
    responseHandler.error(response, null, ex.message)
  }
});

// router.post('/user/update', (request: express.Request, response: express.Response) => {

//   responseHandler.success(response, null, "User updated.");
// });

router.post('/user/deactivate/:id', async (request: apiRequest, response: express.Response) => {
  try {
    const userId: string = request.params.id;
    UserService.deactivate(userId, response);
  } catch(ex: any) {
    logger.error(ex)
    responseHandler.error(response, null, ex.message)
  }
});

router.post('/user/activate/:id', async (request: apiRequest, response: express.Response) => {
  try {
    const userId: string = request.params.id;
    UserService.activate(userId, response);
  } catch(ex: any) {
    logger.error(ex)
    responseHandler.error(response, null, ex.message)
  }
});

// router.post('/user/login', (request: express.Request, response: express.Response) => {

//   responseHandler.success(response, null, "User login accepted.");
// });

export = router