import { Game } from '../models/game';
import { NotFoundError } from '../errors';

export class GameService {

  getByKey(key: string): Game {

    const game = this.getAll().find( game => game.key === key);
    if (typeof game === 'undefined') {
      throw new NotFoundError('No such game: ' + key);
    }
    return game;

  }

  getAll(): Game[] {

    const games: Game[] = [
      {
        key: 'ssb64',
        title: 'Super Smash Bros. 64'
      },
      {
        key: 'ssbm',
        title: 'Super Smash Bros. Melee'
      },
      {
        key: 'ssbb',
        title: 'Super Smash Bros. Brawl'
      },
      {
        key: 'ssb4',
        title: 'Super Smash Bros. 4'
      },
      {
        key: 'ssbu',
        title: 'Super Smash Bros. Ultimate'
      },
    ];
    return games;

  }


}
