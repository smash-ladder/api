import { Ranking } from '../models/ranking';
import { Ladder } from '../models/ladder';
import { Player } from '../models/player';
import { Match } from '../models/match';
import { NotFoundError } from '../errors';
import { MatchService } from './match';
import db from '../db';

export class RankingService {

  async getByLadderAndPlayer(ladder: Ladder, player: Player): Promise<Ranking> {

    const ranking = (await this.getByLadder(ladder)).find( ranking =>
      ranking.player.id === player.id
    );
    if (typeof ranking === 'undefined') {
      throw new NotFoundError('No such ranking');
    }
    return ranking;

  }

  async getByLadder(ladder: Ladder): Promise<Ranking[]> {

    const matchService = new MatchService();
    const matches = await matchService.getByLadder(ladder);

    switch (ladder.algorithm) {

      case 'bump' :
        return this.bumpSort(ladder, matches);

      default :
        throw new Error('Unknown laddder algorithm: ' + ladder.algorithm);

    }

  }

  bumpSort(ladder: Ladder, matches: Match[]): Ranking[] {

    const rankings: Ranking[] = [];

    for (const match of matches) {

      // Get current rankings
      let loserPosition = rankings.findIndex( ranking => ranking.player.id === match.loser.id );
      const winnerPosition = rankings.findIndex( ranking => ranking.player.id === match.winner.id );

      // Is the loser in the rankings yet?
      if (loserPosition === -1) {
        rankings.push({
          ladder: ladder,
          player: match.loser,
          rank: 0
        });
        loserPosition = rankings.length - 1;
      }

      // Was the winner allowed to challenge the loser?
      if (winnerPosition === -1 && loserPosition < rankings.length - ladder.challengeRankingLimit) {
        // no. Ignore this match.
        console.log('Invalid match', match);
        continue;
      } else if (winnerPosition - loserPosition > ladder.challengeRankingLimit && winnerPosition < loserPosition) {
        // no. Ignore this match.
        console.log('Invalid match', match);
        continue;
      }

      if (winnerPosition !== -1) {
        // remove winner from existing position
        rankings.splice(winnerPosition, 1);
      }

      // Insert the winner.
      rankings.splice(loserPosition, 0, {
        ladder: ladder,
        player: match.winner,
        rank: 0
      });

    }

    let position = 0;
    // Reset the rank numbers
    for(const ranking of rankings) {
      ranking.rank = ++position;
    }
    return rankings;

  }

}
