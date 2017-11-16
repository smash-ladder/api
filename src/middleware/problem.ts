import { Context } from 'koa';
import { APIError } from '../errors';

/**
 * The Problem middleware catches any exceptions, and reformats them into a
 * application/problem+json response body.
 *
 * It eats every exception.
 */
async function errorMiddleware(ctx: Context, next: Function) {

  try {

    await next();

  } catch (err) {

    const contentType = 'application/problem+json';
    let errorBody: {
      type: string,
      status: number,
      title: string,
      detail: string
    };

    if (err instanceof APIError) {

      errorBody = {
        type: 'https://api.yelpwifi.com/errors/' + err.type,
        status: err.status,
        title: err.title,
        detail: err.detail
      };

    } else {

      console.log(err);
      errorBody = {
        type: 'https://api.yelpwifi.com/errors/internal-server-error',
        status: 500,
        title: 'Internal server error',
        detail: err.message
      };

    }

    console.log(err);

    ctx.status = errorBody.status;
    ctx.body = errorBody;
    ctx.response.set('Content-Type', contentType);

  }

}

export default errorMiddleware;
