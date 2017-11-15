import { Match } from '../models/match';
import { Ladder } from '../models/ladder';
import { Player } from '../models/player';
import { NotFoundError } from '../errors';
import { PlayerService } from './player';

export class MatchService {

  getByLadderAndId(ladder: Ladder, id: number): Match {

    const match = this.getByLadder(ladder).find( match =>
      match.id === id
    );
    if (typeof match === 'undefined') {
      throw new NotFoundError('No such match');
    }
    return match;

  }

  getByLadder(ladder: Ladder): Match[] {

    if (ladder.key !== 'ssb64-1v1') {
      return [];
    }

    const playerService = new PlayerService();

    const result: Match[] = [
      {
        id: 1,
        created: new Date(),
        ladder: ladder,
        winner: playerService.getByUserName('evert'),
        loser: playerService.getByUserName('bschouw'),
        livesLeft: 2
      }

    ];

    return result;

  }

}
