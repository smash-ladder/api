import { Player } from '../models/player';
import { NotFoundError } from '../errors';
import db from '../db';

export class PlayerService {

  async getByUserName(userName: string): Promise<Player> {

    let player = (await this.getAll()).find( player =>
      player.userName === userName
    );
    if (typeof player === 'undefined') {
      player = {
        name: null,
        userName: userName,
        email: userName + '@yelp.com'
      };
      await this.save(player);
    }
    return player;

  }

  async getAll(): Promise<Player[]> {

    const query = 'SELECT * FROM smash_player';
    const result = await db.query(query);

    const players: Player[] = [];

    for(const row of result[0]) {

      players.push({
        name: row.name,
        userName: row.userName,
        email: row.email
      });

    }

    return players;

  }

  async save(player: Player) {

    const query = `
      INSERT INTO smash_player
      SET created = UNIX_TIMESTAMP(), modified = UNIX_TIMESTAMP(), ?
      ON DUPLICATE KEY UPDATE modified = UNIX_TIMESTAMP(), ?
    `

    await db.query(query, [player, player])

  }

}
