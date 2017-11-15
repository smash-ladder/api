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

  const result:any = {
    _links: {
      self: { href: '/players/' + player.userName }
    },
    name: player.name,
    userName: player.userName
  };
  if (player.name) {
    result.name = player.name;
  }
  if (player.email) {
    result._links.alternate = { href: 'mailto:' + player.email };
    result._links.icon = { href: 'https://www.gravatar.com/avatar/' + crypto.createHash('md5').update(player.email).digest('hex') };
  }

  return result;

}
