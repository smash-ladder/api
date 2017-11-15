import { BaseController } from './base';
import { Context } from 'koa';
import { home } from '../formats/hal/home';

export class HomeController extends BaseController {

  constructor () {

    super();

  }

  get(ctx: Context) {

    ctx.body = home();

  }

}
