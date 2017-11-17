import { BaseController } from './base';
import { Context } from 'koa';
import { model } from '../formats/hal/challenge';
import { LadderService } from '../services/ladder';
import { PlayerService } from '../services/player';
import { ChallengeService } from '../services/challenge';

export class ChallengeController extends BaseController {

  async get(ctx: Context) {

    const challengeService = new ChallengeService();
    const ladderService = new LadderService();

    const ladder = ladderService.getByKey(ctx.params.ladderKey);

    ctx.body = model(await challengeService.getByLadderAndId(
      ladder,
      ctx.params.challengeId
    ));

  }

}
