import { BaseController } from './base';
import { Context } from 'koa';
import { collection } from '../formats/hal/character';
import { Character } from '../models/character';
import { CharacterService } from '../services/character';
import { GameService } from '../services/game';

export class CharacterCollectionController extends BaseController {

  get(ctx: Context) {

    const characterService = new CharacterService();
    const gameService = new GameService();

    const game = gameService.getByKey(ctx.params.gameKey);

    ctx.body = collection(
      game,
      characterService.getByGame(game)
    );

  }

}
