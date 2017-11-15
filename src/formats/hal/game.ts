import { Game } from '../../models/game';

export function collection(games: Game[]) {

  return {
    _links: {
      self: { href: '/games' },
    },
    _embedded: {
      item: games.map(model)
    }
  };

}

export function model(game: Game): any {

  return {
    _links: {
      self: { href: '/games/' + game.key },
      characters: { href: '/games/' + game.key + '/characters' },
      stages: { href: '/games/' + game.key + '/stages' },
      collection: { href: '/games' },
    },
    title: game.title
  };

}
