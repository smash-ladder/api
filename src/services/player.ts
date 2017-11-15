import { Player } from '../models/player';
import { NotFoundError } from '../errors';

export class PlayerService {

  getByUserName(userName: string): Player {

    const player = this.getAll().find( player =>
      player.userName === userName
    );
    if (typeof player === 'undefined') {
      throw new NotFoundError('Unknown player');
    }
    return player;

  }

  getAll(): Player[] {

    const players: Player[] = [
      {
        name: 'Evert',
        userName: 'evert',
        email: 'evert@yelp.com'
      },
      {
        name: 'Brendan',
        userName: 'bschouw',
        email: 'bschouw@yelp.com'
      }
    ];
    return players;

  }

}
