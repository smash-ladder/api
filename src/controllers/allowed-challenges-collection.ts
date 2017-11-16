import { BaseController } from './base';
import { Context } from 'koa';
import { collection } from '../formats/hal/ranking';
import { LadderService } from '../services/ladder';
import { PlayerService } from '../services/player';
import { RankingService } from '../services/ranking';

export class AllowedChallengesCollectionController extends BaseController {

  async get(ctx: Context) {

    const rankingService = new RankingService();
    const ladderService = new LadderService();
    const playerService = new PlayerService();

    const ladder = ladderService.getByKey(ctx.params.ladderKey);
    const player = await playerService.getByUserName(ctx.params.userName);

    ctx.body = collection(ladder, await rankingService.getAllowedChallenges(
      ladder,
      player
    ));

  }

}
