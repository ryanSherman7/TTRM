import express = require('express');
import apiRequest from '../../interfaces/request.interface';
const router = express.Router();
const responseHandler = require('../../services/utility/responseHandler.service.ts');
const UserService = require('../../services/user.service.ts')

router.get('/users/:id', async (request: apiRequest, response: express.Response, next) => {
  try {
    const id = request.params.id;

    const user = await UserService.getById(id);
    responseHandler.success(response, user, "User found.");
  } catch (ex: any) {
    next(ex);
  }
});

router.get('/users', async (request: apiRequest, response: express.Response, next) => {
  try {
    const params = request.params;

    const user = await UserService.get(params);
    responseHandler.success(response, user, "User found.");
  } catch (ex: any) {
    next(ex);
  }
});

router.post('/users', async (request: apiRequest, response: express.Response, next) => {
  try {
    const user = await UserService.create(request.body);
    responseHandler.success(response, user, "User Created.");
  } catch (ex: any) {
    next(ex);
  }
});

router.put('/users/:id', async (request: apiRequest, response: express.Response, next) => {
  try {
    const id = request.params.id;
    const update = request.body?.update;
    const options = request.body?.options;

    const user = await UserService.update({_id: id}, update, options);
    responseHandler.success(response, user, "User Updated.");
  } catch (ex: any) {
    next(ex);
  }
});

router.put('/users', async (request: apiRequest, response: express.Response, next) => {
  try {
    const query = request.body?.query;
    const update = request.body?.update;

    const user = await UserService.updateValidOnly(query, update);
    responseHandler.success(response, user, "User Updated.");
  } catch (ex: any) {
    next(ex);
  }
});

router.put('/users/:id/activate', async (request: apiRequest, response: express.Response, next) => {
  try {
    const userId: string = request.params.id;

    const user = await UserService.activate(userId);
    responseHandler.success(response, user, "User activated.");
  } catch(ex: any) {
    next(ex);
  }
});

router.put('/users/:id/deactivate', async (request: apiRequest, response: express.Response, next) => {
  try {
    const userId: string = request.params.id;
    const user = await UserService.deactivate(userId);
    responseHandler.success(response, user, "User deactivated.");
  } catch(ex: any) {
    next(ex);
  }
});

// router.post('/user/login', (request: express.Request, response: express.Response) => {
//   responseHandler.success(response, null, "User login accepted.");
// });

// router.post('/user/signup', (request: express.Request, response: express.Response) => {
//     try {
//       const body: UserInterface = request.body;
//       const user = await UserService.signup(body, response);
//       responseHandler.success(response, user, "User found.");
//     } catch(ex: any) {
//       Logger.error(ex)
//       responseHandler.error(response, null, ex.message)
//     }
//   });

export = router