import { Player } from '../models/player';
import { NotFoundError } from '../errors';
import db from '../db';

export class PlayerService {

  async getByUserName(userName: string): Promise<Player> {

    const player = (await this.getAll()).find( player =>
      player.userName === userName
    );
    if (typeof player === 'undefined') {
      throw new NotFoundError('Unknown player');
    }
    return player;

  }

  async getAll(): Promise<Player[]> {

    const query = 'SELECT * FROM smash_player';
    const result = await db.query(query);

    console.log(result);

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
