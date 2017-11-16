import { BaseController } from './base';
import { Context } from 'koa';
import { collection } from '../formats/hal/player';
import { Player } from '../models/player';
import { PlayerService } from '../services/player';

export class PlayerCollectionController extends BaseController {

  async get(ctx: Context) {

    const service = new PlayerService();
    ctx.body = collection(await service.getAll());

  }

}
