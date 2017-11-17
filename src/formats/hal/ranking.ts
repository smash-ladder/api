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

  const result: any = {
    _links: {
      self: { href: '/ladders/' + ladder.key + '/rankings/' + ranking.player.userName },
      ladder: {
        href: '/ladders/' + ladder.key,
        title: ladder.title
      },
      player: {
        href: '/players/' + ranking.player.userName,
        title: ranking.player.name
      },
      allowedChallenges: {
        href: '/ladders/' + ladder.key + '/rankings/' + ranking.player.userName + '/allowed-challenges',
        title: 'List of people that this person may challenge'
      }
    },
    rank: ranking.rank
  };

  if (ranking.favoriteCharacter) {
    result._links.favoriteCharacter = {
      href: '/games/' + ranking.favoriteCharacter.game.key + '/characters/' + ranking.favoriteCharacter.key,
      title: ranking.favoriteCharacter.name
    };
  }

  return result;

}
