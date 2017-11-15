import { BaseController } from './base';
import { Context } from 'koa';
import { model } from '../formats/hal/ladder';
import { Ladder } from '../models/ladder';
import { LadderService } from '../services/ladder';

export class LadderController extends BaseController {

  get(ctx: Context) {

    const service = new LadderService();
    ctx.body = model(service.getByKey(ctx.params.ladderKey));

  }

}
