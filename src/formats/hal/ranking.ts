import { Ladder } from '../../models/ladder';
import { Ranking } from '../../models/ranking';

export function collection(ladder: Ladder, rankings: Ranking[]) {

  return {
    _links: {
      self: { href: '/ladders/' + ladder.key + '/rankings' },
      ladder: { href: '/ladders/' + ladder.key }
    },
    _embedded: {
      item: rankings.map( ranking => model(ladder, ranking))
    }
  };

}

export function model(ladder: Ladder, ranking: Ranking) {

  return {
    _links: {
      self: { href: '/ladders/' + ladder.key + '/rankings/' + ranking.player.userName },
      ladder: { href: '/ladders/' + ladder.key },
      player: { href: '/players/' + ranking.player.userName }
    },
    rank: ranking.rank
  };

}
