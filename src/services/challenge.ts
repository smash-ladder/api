import { Challenge } from '../models/challenge';
import { Ladder } from '../models/ladder';
import { Player } from '../models/player';
import { NotFoundError } from '../errors';
import { PlayerService } from './player';
import { StageService } from './stage';
import { CharacterService } from './character';
import db from '../db';

export class ChallengeService {

  async getByLadderAndId(ladder: Ladder, id: number): Promise<Challenge> {

    const challenge = (await this.getByLadder(ladder)).find( challenge =>
      challenge.id === id
    );
    if (typeof challenge === 'undefined') {
      throw new NotFoundError('No such challenge');
    }
    return challenge;

  }

  async getByLadder(ladder: Ladder): Promise<Challenge[]> {

    const playerService = new PlayerService();
    const characterService = new CharacterService();
    const stageService = new StageService();

    const query = `
      SELECT * FROM smash_challenge WHERE ladder_id = ? ORDER BY created
    `;

    const result = await db.query(query, [ladder.key]);
    const challenges: Challenge[] = [];

    for (const row of result[0]) {

      challenges.push({
        id: row.id,
        created: new Date(row.created * 1000),
        ladder: ladder,
        from: await playerService.getById(row.from_id),
        to: await playerService.getById(row.to_id)
      });

    }

    return challenges;

  }

  async save(challenge: Challenge) {

    const query = `
      INSERT INTO smash_challenge SET
        created = UNIX_TIMESTAMP(),
        ?
      `;

    const result = await db.query(query, [{
      ladder_id: challenge.ladder.key,
      from_id: challenge.from.id,
      to_id: challenge.to.id
    }]);

    challenge.id = result[0].insertId;

  }

}
