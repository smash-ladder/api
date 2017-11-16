import { BaseController } from './base';
import { Context } from 'koa';
import { model } from '../formats/hal/player';
import { Player } from '../models/player';
import { PlayerService } from '../services/player';

export class PlayerController extends BaseController {

  async get(ctx: Context) {

    const service = new PlayerService();
    ctx.body = model(await service.getByUserName(ctx.params.userName));

  }

}
