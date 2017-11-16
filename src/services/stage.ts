import { Game } from '../models/game';
import { GameService } from './game';
import { Stage } from '../models/stage';
import { NotFoundError } from '../errors';

export class StageService {

  getByUri(uri: string): Stage {

    const matches = uri.match(/\/games\/([^\/]+)\/stages\/([^\/]+)$/);
    if (!matches) {
      throw new Error('Unkown stage uri: ' + uri);
    }

    const gameService = new GameService();

    return this.getByGameAndKey(
      gameService.getByKey(matches[1]),
      matches[2]
    );

  }

  getByGameAndKey(game: Game, key: string): Stage {

    const stage = this.getByGame(game).find( stage =>
      stage.key === key
    );

    if (typeof stage === 'undefined') {
      throw new NotFoundError('Stage not found!');
    }

    return stage;

  }

  getByGame(game: Game): Stage[] {

    let stages: Stage[] = [];
    switch (game.key) {
      case 'ssb64' :
        stages = [
          {
            key: 'peachs-castle',
            name: 'Peach\'s Castle',
            game: game
          },
          {
            key: 'congo-jungle',
            name: 'Congo Jungle',
            game: game
          },
          {
            key: 'hyrule-castle',
            name: 'Hyrule Castle',
            game: game
          },
          {
            key: 'planet-zebus',
            name: 'Planet Zebus',
            game: game
          },
          {
            key: 'mushroom-kingdom',
            name: 'Mushroom Kingdom',
            game: game
          },
          {
            key: 'yoshis-island',
            name: 'Yoshi\'s Island',
            game: game
          },
          {
            key: 'dream-land',
            name: 'Dream Land',
            game: game
          },
          {
            key: 'sector-z',
            name: 'Sector Z',
            game: game
          },
          {
            key: 'saffron-city',
            name: 'Saffron City',
            game: game
          },
        ];
        break;
      case 'ssbm' :
        stages = [
        ];
        break;
    }

    return stages;

  }
}
