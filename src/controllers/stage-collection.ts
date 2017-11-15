import { BaseController } from './base';
import { Context } from 'koa';
import { collection } from '../formats/hal/stage';
import { Stage } from '../models/stage';
import { StageService } from '../services/stage';
import { GameService } from '../services/game';

export class StageCollectionController extends BaseController {

  get(ctx: Context) {

    const stageService = new StageService();
    const gameService = new GameService();

    const game = gameService.getByKey(ctx.params.gameKey);

    ctx.body = collection(
      game,
      stageService.getByGame(game)
    );

  }

}
