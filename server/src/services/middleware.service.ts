import type express = require('express');
import type UserInterface from '../interfaces/user.interface';
import PermissionInterface from '../interfaces/permission.interface';
import { PermissionsEnum } from "../enums";
import apiRequest from '../interfaces/request.interface';
const PermissionModel = require('../db/models/permission.schema.ts');
const responseHandler = require('../services/responseHandler.service.ts'); 
const logger = require('../services/logger.service.ts');

const ValidationMiddleware = {
    canCall: () => {

    },
    validateParameters: () => {

    }
}