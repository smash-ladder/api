import { BaseController } from './base';
import { Context } from 'koa';
import { model } from '../formats/hal/ranking';
import { LadderService } from '../services/ladder';
import { PlayerService } from '../services/player';
import { RankingService } from '../services/ranking';

export class RankingController extends BaseController {

  async get(ctx: Context) {

    const rankingService = new RankingService();
    const ladderService = new LadderService();
    const playerService = new PlayerService();

    const ladder = ladderService.getByKey(ctx.params.ladderKey);

    ctx.body = model(ladder, rankingService.getByLadderAndPlayer(
      ladder,
      await playerService.getByUserName(ctx.params.userName)
    ));

  }

}
