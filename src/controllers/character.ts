import { BaseController } from './base';
import { Context } from 'koa';
import { model } from '../formats/hal/character';
import { Character } from '../models/character';
import { CharacterService } from '../services/character';
import { GameService } from '../services/game';

export class CharacterController extends BaseController {

  get(ctx: Context) {

    const characterService = new CharacterService();
    const gameService = new GameService();

    const game = gameService.getByKey(ctx.params.gameKey);

    ctx.body = model(
      characterService.getByGameAndKey(game, ctx.params.characterKey)
    );

  }

}
