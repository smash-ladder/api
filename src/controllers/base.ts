import { Context } from 'koa';
import { MethodNotAllowedError } from '../errors';

export abstract class BaseController {

  async handle(ctx: Context) {

    const method = ctx.method.toLowerCase();

    if (typeof (this as any)[method] !== 'function') {
      throw new MethodNotAllowedError(`HTTP ${ctx.method} is not allowed this endpoint`);
    }

    await (this as any)[method](ctx);

  }

}
