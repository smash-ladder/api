import { Context } from 'koa';
import { NotFoundError } from '../errors';

/**
 * The notfound middleware makes sure that a NotFound exception gets emitted.
 *
 * It should always sit at the end of the chain of middlewares.
 */
export default async function (ctx: Context, next: Function) {

  throw new NotFoundError('Resource not found');

}

