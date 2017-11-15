import { BaseController } from './base';
import { Context } from 'koa';
import { model } from '../formats/hal/game';
import { Game } from '../models/game';
import { GameService } from '../services/game';

export class GameController extends BaseController {

  get(ctx: Context) {

    const service = new GameService();
    ctx.body = model(service.getByKey(ctx.params.key));

  }

}
