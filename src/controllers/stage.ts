import { BaseController } from './base';
import { Context } from 'koa';
import { model } from '../formats/hal/stage';
import { Stage } from '../models/stage';
import { StageService } from '../services/stage';
import { GameService } from '../services/game';

export class StageController extends BaseController {

  get(ctx: Context) {

    const stageService = new StageService();
    const gameService = new GameService();

    const game = gameService.getByKey(ctx.params.gameKey);

    ctx.body = model(
      stageService.getByGameAndKey(game, ctx.params.stageKey)
    );

  }

}
