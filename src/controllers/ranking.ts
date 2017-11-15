import { BaseController } from './base';
import { Context } from 'koa';
import { model } from '../formats/hal/ranking';
import { LadderService } from '../services/ladder';
import { PlayerService } from '../services/player';
import { RankingService } from '../services/ranking';

export class RankingController extends BaseController {

  get(ctx: Context) {

    const rankingService = new RankingService();
    const ladderService = new LadderService();
    const playerService = new PlayerService();

    const service = new RankingService();

    ctx.body = model(service.getByLadderAndPlayer(
      ladderService.getByKey(ctx.params.ladderKey),
      playerService.getByKey(ctx.params.playerKey)
    ));

  }

}
