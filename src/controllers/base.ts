import { Context } from 'Koa';
import { MethodNotAllowedError } from '../errors';

export abstract class BaseController {

  async handle(ctx: Context) {

    if ((this as any)[ctx.method] !== 'function') {
      throw new MethodNotAllowedError(`HTTP ${ctx.method} is not allowed this endpoint`);
    }
    ctx.body = 'Hello world';

  }

}
