import express = require('express');
const responseHandler = {
  /**
   * Standard http response for success
   * @param {express.response} response Soap Endpoint name
   * @param {Object|null} body Soap request, without body, envelope, or proc endpoint name tags
   * @param {string} message callback for results, takes one parameter (optional)
  */
  success: (response: express.Response, body: Object | null = null, message: string,) => {
    response.send({
      status: 200,
      message: `Success: ${message}`,
      body: body
    });
  },
  error: (response: express.Response, body: Object | null = null, message: string,) => {
    response.send({
      status: 500,
      message: `Error: ${message}`,
      body: body
    });
  },
  custom: (response: express.Response, body: Object | null = null, message: string, statusCode: number) => {
    response.send({
      status: statusCode,
      message: message,
      body: body
    });
  }
}
export = responseHandler;