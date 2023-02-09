import type express = require('express');
const ResponseHandler = {
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
   * Standard http response for errors (500)
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