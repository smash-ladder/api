import { Character } from '../../models/character';
import { Game } from '../../models/game';

export function collection(game: Game, characters: Character[]) {

  return {
    _links: {
      self: { href: '/games/' + game.key + '/characters' },
      game: {
        href: '/games/' + game.key,
        title: game.title
      },
    },
    _embedded: {
      item: characters.map(model)
    }
  };

}

export function model(character: Character): any {

  return {
    _links: {
      self: { href: '/games/' + character.game.key + '/characters/' + character.key },
      game: {
        href: '/games/' + character.game.key,
        title: character.game.title
      }
    },
    name: character.name,
    key: character.key,
  };

}
