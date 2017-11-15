import { Ranking } from '../models/ranking';
import { Ladder } from '../models/ladder';
import { Player } from '../models/player';
import { NotFoundError } from '../errors';

export class RankingService {

  getByLadderAndPlayer(ladder: Ladder, player: Player): Ranking {

    const ranking = this.getAll().find( ranking =>
      ranking.player === player.userName && ranking.ladder === ladder.key
    );
    if (typeof ranking === 'undefined') {
      throw new NotFoundError('No such ranking');
    }
    return ranking;

  }

  getByLadder(ladder: Ladder): Ranking[] {

    return this.getAll().filter( ranking => ranking.ladder === ladder.key);

  }

  getAll(): Ranking[] {

    const ranking: Ranking[] = [
      {
        ladder: 'ssb64-1v1',
        player: 'evert',
        rank: 1
      },
      {
        ladder: 'ssb64-1v1',
        player: 'bschouw',
        rank: 1
      }
    ];
    return ranking;

  }

}
