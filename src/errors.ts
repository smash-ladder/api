export class APIError extends Error {

  title: string
  status: number
  type: string
  detail: string

  constructor(detail: string) {
    super();
    this.detail = detail;
  }
}

/**
 * 400 Bad Request
 */
export class BadRequestError extends APIError {

  type = 'bad-request';
  title = 'Bad Request';
  status = 400;

}

/**
 * 401 Unauthorized
 */
export class UnauthorizedError extends APIError {

  type = 'unauthorized';
  title = 'Unauthorized';
  status = 401;

};

/**
 * 403 Forbidden
 */
export class ForbiddenError extends APIError {

  type = 'forbidden';
  title = 'Forbidden';
  status = 403;

};

/**
 * 404 Not Found
 */
export class NotFoundError extends APIError {

  type = 'not-found';
  title = 'Not Found';
  status = 404;

};

/**
 * 405 Method Not Allowed
 */
export class MethodNotAllowedError extends APIError {

  type = 'method-not-allowed';
  title = 'Method Not Allowed';
  status = 405;

};

/**
 * 406 Not Acceptable
 */
export class NotAcceptableError extends APIError {

  type = 'not-acceptable';
  title = 'Not Acceptable';
  status = 406;

};

/**
 * 409 Conflict
 */
export class ConflictError extends APIError {

  type = 'conflict';
  title = 'Conflict';
  status = 409;

};

/**
 * 415 Unsupported Media Type
 */
export class UnsupportedMediaTypeError extends APIError {

  type = 'unsupported-media-type';
  title = 'The Content-Type you sent in the request body is not one that the server supports.';
  status = 415;

};

/**
 * 422 Unprocessable Entity
 */
export class UnprocessableEntity extends APIError {

  type = 'unprocessable-entity';
  title = 'Unprocessable Entity';
  status = 422;

};

/**
 * 500 Internal Server Error
 */
export class InternalServerError extends APIError {

  type = 'internal-server-error';
  title = 'Internal Server Error';
  status = 500;

};

/**
 * 503 Service Unavailable
 */
class ServiceUnavailableError extends APIError {

  type = 'service-unavailable';
  status = 503;
  title = 'Service Unavailable';

};

