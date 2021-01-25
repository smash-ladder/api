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

  const result: any = {
    _links: {
      self: { href: '/ladders/' + match.ladder.key + '/match/' + match.id },
      ladder: { href: '/ladders/' + match.ladder.key },
      winner: {
        href: '/players/' + match.winner.userName,
        title: match.winner.name
      },
      loser: {
        href: '/players/' + match.loser.userName,
        title: match.loser.name
      },
      winnerCharacter: {
        href: '/games/' + match.ladder.game.key + '/characters/' + match.winnerCharacter.key,
        title: match.winnerCharacter.name
      },
      loserCharacter: {
        href: '/games/' + match.ladder.game.key + '/characters/' + match.loserCharacter.key,
        title: match.loserCharacter.name
      },
    },
    livesLeft: match.livesLeft,
    createdAt: match.createdAt
  };

  if (match.stage) {
    result._links.stage = {
      href: '/games/' + match.ladder.game.key + '/stages/' + match.stage.key,
      title: match.stage.name
    };
  }

  return result;

}
