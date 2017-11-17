import { BaseController } from './base';
import { Context } from 'koa';
import { collection } from '../formats/hal/challenge';
import { Challenge } from '../models/challenge';
import { LadderService } from '../services/ladder';
import { ChallengeService } from '../services/challenge';
import { PlayerService } from '../services/player';
import { CharacterService } from '../services/character';
import { StageService } from '../services/stage';

export class ChallengeCollectionController extends BaseController {

  async get(ctx: Context) {

    const challengeService = new ChallengeService();
    const ladderService = new LadderService();

    const ladder = await ladderService.getByKey( ctx.params.ladderKey );
    ctx.body = collection(
      ladder,
      await challengeService.getByLadder(ladder)
    );

  }

  async post(ctx: Context) {

    const challengeService = new ChallengeService();
    const ladderService = new LadderService();
    const playerService = new PlayerService();

    const ladder = await ladderService.getByKey( ctx.params.ladderKey );
    const from = await playerService.getByUri( ctx.request.body._links.from.href );
    const to = await playerService.getByUri( ctx.request.body._links.to.href );

    const challenge: Challenge = {
      id: undefined,
      created: undefined,
      ladder: ladder,
      from: from,
      to: to
    };

    await challengeService.save(challenge);

    ctx.status = 201;
    ctx.body = {};

  }

}
