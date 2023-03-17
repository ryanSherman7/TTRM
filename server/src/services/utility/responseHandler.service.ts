import type express = require('express');
import { Logger } from './logger.service';
import apiRequest from '../../interfaces/request.interface';

const ResponseHandler = {
  /**
   * Handles all errors from routes as part of the middleware
   * @param {Error} ex error object
   * @param {apiRequest} request request object
   * @param {express.Response} response response object
   * @param {next} next
  */
  processError: (ex: any, request: apiRequest, response: express.Response, next: any) => {
    Logger.error(ex);

    switch(ex.statusCode) {
      case 400: ResponseHandler.badRequest(response, null, ex.message); break;
      case 404: ResponseHandler.notFound(response, null, ex.message); break;
      case 500: ResponseHandler.error(response, null, ex.message); break;
      default: ResponseHandler.custom(response, null, ex.message, ex.statusCode); break;
    }
  },
  /**
   * Standard http response for success (200)
   * @param {express.response} response response object
   * @param {Object|null} body return content. default is null
   * @param {string} message quick summary of what happened
  */
  success: (response: express.Response, body: Object | null = null, message: string) => {
    response.status(200).send({
      status: 200,
      message: `Success: ${message}`,
      content: body
    });
  },
  /**
   * Standard http response for errors (500)
   * @param {express.response} response response object
   * @param {Object|null} body return content. default is null
   * @param {string} message quick summary of what happened
  */
  error: (response: express.Response, body: Object | null = null, message: string) => {
    response.status(500).send({
      status: 500,
      message: `Error: ${message}`,
      content: body
    });
  },
  /**
   * Standard http response for invalid request errors (400)
   * @param {express.response} response response object
   * @param {Object|null} body return content. default is null
   * @param {string} message quick summary of what happened
  */
  badRequest: (response: express.Response, body: Object | null = null, message: string) => {
    response.status(400).send({
      status: 400,
      message: `Invalid Request: ${message}`,
      content: body
    });
  },
  /**
   * Standard http response for not found errors (403)
   * @param {express.response} response response object
   * @param {Object|null} body return content. default is null
   * @param {string} message quick summary of what happened
  */
  notFound: (response: express.Response, body: Object | null = null, message: string) => {
    response.status(400).send({
      status: 400,
      message: `Not Found: ${message}`,
      content: body
    });
  },
  /**
   * Catch all for any other errors
   * @param {express.response} response response object
   * @param {Object|null} body return content. default is null
   * @param {string} message quick summary of what happened
   * @param {number} statusCode response code
  */
  custom: (response: express.Response, body: Object | null = null, message: string, statusCode: number = 500) => {
    statusCode = (statusCode < 100 || statusCode > 599) ? 500 : statusCode;
    response.status(statusCode).send({
      status: statusCode,
      message: message,
      content: body
    });
  }
}
export = ResponseHandler;