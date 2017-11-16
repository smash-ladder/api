import { BaseController } from './base';
import { Context } from 'koa';
import { model } from '../formats/hal/match';
import { LadderService } from '../services/ladder';
import { PlayerService } from '../services/player';
import { MatchService } from '../services/match';

export class MatchController extends BaseController {

  async get(ctx: Context) {

    const matchService = new MatchService();
    const ladderService = new LadderService();

    const ladder = ladderService.getByKey(ctx.params.ladderKey);

    ctx.body = model(await matchService.getByLadderAndId(
      ladder,
      ctx.params.matchId
    ));

  }

}
