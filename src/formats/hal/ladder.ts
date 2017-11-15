import { Ladder } from '../../models/ladder';

export function collection(ladders: Ladder[]) {

  return {
    _links: {
      self: { href: '/ladders' },
    },
    _embedded: {
      item: ladders.map(model)
    }
  };

}

export function model(ladder: Ladder) {

  return {
    _links: {
      self: { href: '/ladders/' + ladder.key },
    },
    title: ladder.title
  };

}
