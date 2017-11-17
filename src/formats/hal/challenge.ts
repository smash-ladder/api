import { Ladder } from '../../models/ladder';
import { Challenge } from '../../models/challenge';

export function collection(ladder: Ladder, challenges: Challenge[]) {

  return {
    _links: {
      self: { href: '/ladders/' + ladder.key + '/rankings' },
      ladder: { href: '/ladders/' + ladder.key }
    },
    _embedded: {
      item: challenges.map( challenge => model(challenge))
    }
  };

}

export function model(challenge: Challenge) {

  return {
    _links: {
      self: { href: '/ladders/' + challenge.ladder.key + '/challenge/' + challenge.id },
      ladder: { href: '/ladders/' + challenge.ladder.key },
      from: {
        href: '/players/' + challenge.from.userName,
        title: challenge.from.name
      },
      to: {
        href: '/players/' + challenge.to.userName,
        title: challenge.to.name
      }
    },
    created: challenge.created
  };

}
