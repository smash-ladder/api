import { Ladder } from '../models/ladder';
import { NotFoundError } from '../errors';
import { StageService } from './stage';
import { GameService } from './game';

export class LadderService {

  getByKey(key: string): Ladder {

    const gameService = new GameService();
    const stageService = new StageService();

    switch (key) {
      case 'ssb64-1v1' : {
        const game = gameService.getByKey('ssb64');
        const dreamLand = stageService.getByGameAndKey(game, 'dream-land');
        const yoshisIsland = stageService.getByGameAndKey(game, 'yoshis-island');

        const ladder: Ladder = {
          key: 'ssb64-1v1',
          title: 'Super Smash Bros 64 1v1',
          game: game,
          allowedStages: [dreamLand],
          allowedItems: 'All items, except Hammer, Maxim Tomato, Heart Container',
          lives: 5,
          challengeRankingLimit: 4,
          algorithm: 'bump'
        };
        return ladder;
      }
      case 'ssbu-2021' : {
        const game = gameService.getByKey('ssbu');
        const dreamLand = stageService.getByGameAndKey(game, 'dream-land');
        const yoshisIsland = stageService.getByGameAndKey(game, 'yoshis-island');

        const ladder: Ladder = {
          key: 'ssb64-1v1',
          title: 'Super Smash Bros 64 1v1',
          game,
          allowedStages: 'Any battlefield',
          allowedItems: 'none',
          lives: 3,
          challengeRankingLimit: 2,
          algorithm: 'bump'
        };
        return ladder;
      }
    }

    throw new NotFoundError('No such ladder');

  }

  getAll(): Ladder[] {

    return [
      this.getByKey('ssb64-1v1'),
      this.getByKey('ssbu-2021')
    ];

  }

}
