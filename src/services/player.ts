import { Player } from '../models/player';
import { NotFoundError } from '../errors';
import db from '../db';

export class PlayerService {

  async getByUserName(userName: string): Promise<Player> {

    const player = (await this.getAll()).find( player =>
      player.userName === userName
    );
    if (typeof player === 'undefined') {
      throw new Error('Player not found');
    }
    return player;

  }

  async getByUri(uri: string): Promise<Player> {

    // very lazy system, it just uses the last component of the uri
    const userName = uri.match(/\/([^\/]+)$/)[1];
    return this.getByUserName(userName);

  }

  async getById(id: number): Promise<Player> {

    const query = 'SELECT * FROM smash_player WHERE id = ?';
    const result = await db.query(query, [id]);

    if (!result[0]) {
      throw new Error('Player with id: ' + id + ' not found');
    }

    const player: Player = {
      id: result[0][0].id,
      name: result[0][0].name,
      userName: result[0][0].username,
      email: result[0][0].email
    };
    return player;

  }

  async getAll(): Promise<Player[]> {

    const query = 'SELECT * FROM smash_player';
    const result = await db.query(query);

    const players: Player[] = [];

    for (const row of result[0]) {

      players.push({
        id: row.id,
        name: row.name,
        userName: row.username,
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
    `;

    const result = await db.query(query, [player, player]);

    player.id = result[0].insertId;

  }

}
