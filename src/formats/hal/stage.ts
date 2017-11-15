import { Stage } from '../../models/stage';
import { Game } from '../../models/game';

export function collection(game: Game, stages: Stage[]) {

  return {
    _links: {
      self: { href: '/games/' + game.key + '/stages' },
      game: {
        href: '/games/' + game.key,
        title: game.title
      },
    },
    _embedded: {
      item: stages.map(model)
    }
  };

}

export function model(stage: Stage): any {

  return {
    _links: {
      self: { href: '/games/' + stage.game.key + '/stages/' + stage.key },
      game: {
        href: '/games/' + stage.game.key,
        title: stage.game.title
      },
    },
    name: stage.name
  };

}
