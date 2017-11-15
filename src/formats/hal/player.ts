import { Player } from '../../models/player';
import * as crypto from 'crypto';

export function collection(players: Player[]) {

  return {
    _links: {
      self: { href: '/players' }
    },
    _embedded: {
      item: players.map(model)
    }
  };

}

export function model(player: Player): any {

  return {
    _links: {
      self: { href: '/players/' + player.userName },
      icon: { href: 'https://www.gravatar.com/avatar/' + crypto.createHash('md5').update(player.email).digest('hex') },
      alternate: { href: 'mailto:' + player.email }
    },
    name: player.name,
    userName: player.userName
  };

}
