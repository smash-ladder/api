import { Ladder } from '../models/ladder';
import { NotFoundError } from '../errors';
import { StageService } from './stage';
import { GameService } from './game';

export class LadderService {

  getByKey(key: string): Ladder {
    if (key === 'ssb64-1v1') {

      const gameService = new GameService();
      const stageService = new StageService();

      const game = gameService.getByKey('ssb64');
      const dreamLand = stageService.getByGameAndKey(game, 'dream-land');
      const yoshisIsland = stageService.getByGameAndKey(game, 'yoshis-island');

      const ladder: Ladder = {
        key: 'ssb64-1v1',
        title: 'Super Smash Bros 64 1v1',
        game: game,
        allowedStages: [dreamLand, yoshisIsland],
        lives: 5
      };
      return ladder;
    }

    throw new NotFoundError('No such ladder');

  }

  getAll(): Ladder[] {

    return [this.getByKey('ssb64-1v1')];

  }

}
