import { Game } from '../models/game';
import { NotFoundError } from '../errors';

export class GameService {

  getByKey(key: string): Game {

    const game = this.getAll().find( game => game.key === key);
    if (typeof game === 'undefined') {
      throw new NotFoundError('No such game');
    }
    return game;

  }

  getAll(): Game[] {

    const games: Game[] = [
      {
        key: 'sms64',
        title: 'Super Smash Bros 64'
      }
    ];
    return games;

  }


}
