import { Match } from '../models/match';
import { Ladder } from '../models/ladder';
import { Player } from '../models/player';
import { NotFoundError } from '../errors';
import { PlayerService } from './player';

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

    if (ladder.key !== 'ssb64-1v1') {
      return [];
    }

    const playerService = new PlayerService();

    const result: Match[] = [
      {
        id: 1,
        created: new Date(),
        ladder: ladder,
        winner: await playerService.getByUserName('evert'),
        loser: await playerService.getByUserName('bschouw'),
        livesLeft: 2
      }

    ];

    return result;

  }

}
