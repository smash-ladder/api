import { BaseController } from './base';
import { Context } from 'koa';
import { collection } from '../formats/hal/ranking';
import { Ranking } from '../models/ranking';
import { LadderService } from '../services/ladder';
import { RankingService } from '../services/ranking';

export class RankingCollectionController extends BaseController {

  get(ctx: Context) {

    const rankingService = new RankingService();
    const ladderService = new LadderService();

    const ladder = ladderService.getByKey( ctx.params.ladderKey );
    ctx.body = collection(
      ladder,
      rankingService.getByLadder(ladder)
    );

  }

}
