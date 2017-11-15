import { BaseController } from './base';
import { Context } from 'koa';
import { collection } from '../formats/hal/game';
import { Game } from '../models/game';
import { GameService } from '../services/game';

export class GameCollectionController extends BaseController {

  get(ctx: Context) {

    const service = new GameService();
    ctx.body = collection(service.getAll());

  }

}
