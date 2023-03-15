const express = require("express");
import apiRequest from '../interfaces/request.interface';
import initRoutes from '../loaders/initRoutes.service';
import PermissionService = require('./permissions.service');
const bodyParser = require('body-parser');
const cors = require("cors");

const ValidationService = {
    validateParameters: async (request: apiRequest, response: Express.Response, next: Function): Promise<void> => {
        console.log(request.path);
        const parts = request.path.split('/');
        console.log(parts)

        console.log(request.method);
        const userJSON = require('../documentation/API/user.doc.json');

        console.log(userJSON);
        next();
    }
}

export = ValidationService;