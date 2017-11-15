import { Ladder } from '../../models/ladder';
import { Match } from '../../models/match';

export function collection(ladder: Ladder, matches: Match[]) {

  return {
    _links: {
      self: { href: '/ladders/' + ladder.key + '/rankings' },
      ladder: { href: '/ladders/' + ladder.key }
    },
    _embedded: {
      item: matches.map( match => model(match))
    }
  };

}

export function model(match: Match) {

  return {
    _links: {
      self: { href: '/ladders/' + match.ladder.key + '/match/' + match.id },
      ladder: { href: '/ladders/' + match.ladder.key },
      winner: { href: '/players/' + match.winner.userName },
      loser: { href: '/players/' + match.loser.userName }
    },
    livesLeft: match.livesLeft,
    created: match.created
  };

}
