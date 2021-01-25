import { Match } from '../models/match';
import { Ladder } from '../models/ladder';
import { Player } from '../models/player';
import { NotFoundError } from '../errors';
import { PlayerService } from './player';
import { StageService } from './stage';
import { CharacterService } from './character';
import db from '../db';

export class MatchService {

  async getByLadderAndId(ladder: Ladder, id: number): Promise<Match> {

    const match = (await this.getByLadder(ladder)).find( match =>
      match.id === id
    );
    if (typeof match === 'undefined') {
      throw new NotFoundError('No such match');
    }
    return match;

  }

  async getByLadder(ladder: Ladder): Promise<Match[]> {

    const playerService = new PlayerService();
    const characterService = new CharacterService();
    const stageService = new StageService();

    const query = `
      SELECT * FROM smash_match WHERE ladder_id = ? ORDER BY created_at
    `;

    const result = await db.query(query, [ladder.key]);
    const matches: Match[] = [];

    for (const row of result[0]) {

      matches.push({
        id: row.id,
        createdAt: new Date(row.created_at * 1000),
        ladder: ladder,
        winner: await playerService.getById(row.winner_id),
        loser: await playerService.getById(row.loser_id),
        winnerCharacter: await characterService.getByGameAndKey(ladder.game, row.winner_character),
        loserCharacter: await characterService.getByGameAndKey(ladder.game, row.loser_character),
        stage: await stageService.getByGameAndKey(ladder.game, row.stage),
        livesLeft: row.lives_left
      });

    }

    return matches;

  }

  async save(match: Match) {

    const query = `
      INSERT INTO smash_match SET
        created_at = UNIX_TIMESTAMP(),
        ?
      `;

    const result = await db.query(query, [{
      ladder_id: match.ladder.key,
      winner_id: match.winner.id,
      loser_id: match.loser.id,
      lives_left: match.livesLeft,
      stage: match.stage.key,
      winner_character: match.winnerCharacter.key,
      loser_character: match.loserCharacter.key
    }]);

    match.id = result[0].insertId;

  }

}
