import { BaseController } from './base';
import { Context } from 'koa';
import { collection } from '../formats/hal/match';
import { Match } from '../models/match';
import { LadderService } from '../services/ladder';
import { MatchService } from '../services/match';
import { PlayerService } from '../services/player';

export class MatchCollectionController extends BaseController {

  async get(ctx: Context) {

    const matchService = new MatchService();
    const ladderService = new LadderService();

    const ladder = await ladderService.getByKey( ctx.params.ladderKey );
    ctx.body = collection(
      ladder,
      await matchService.getByLadder(ladder)
    );

  }

  async post(ctx: Context) {

    const matchService = new MatchService();
    const ladderService = new LadderService();
    const playerService = new PlayerService();

    const ladder = await ladderService.getByKey( ctx.params.ladderKey );
    const winner = await playerService.getByUri( ctx.request.body._links.winner.href );
    const loser = await playerService.getByUri( ctx.request.body._links.loser.href );

    const match: Match = {
      id: undefined,
      created: undefined,
      ladder: ladder,
      winner: winner,
      loser: loser,
      livesLeft: ctx.request.body.livesLeft
    };

    matchService.save(match);

    ctx.status = 201;
    ctx.body = {};

  }

}
