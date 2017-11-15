import { BaseController } from './base';
import { Context } from 'koa';
import { collection } from '../formats/hal/ladder';
import { Ladder } from '../models/ladder';
import { LadderService } from '../services/ladder';

export class LadderCollectionController extends BaseController {

  get(ctx: Context) {

    const service = new LadderService();
    ctx.body = collection(service.getAll());

  }

}
