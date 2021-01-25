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

  const result: any = {
    _links: {
      self: { href: '/ladders/' + ladder.key },
      game: {
        href: '/games/' + ladder.game.key,
        title: ladder.game.title
      },
      ranking: { href: '/ladders/' + ladder.key + '/rankings', title: 'Current player rankings' },
      matches: { href: '/ladders/' + ladder.key + '/matches', title: 'Previous matches' },
      challenges: { href: '/ladders/' + ladder.key + '/challenges', title: 'Outstanding challenges' },
    },
    title: ladder.title,
    lives: ladder.lives,
    challengeRankingLimit: ladder.challengeRankingLimit,
    algorithm: ladder.algorithm,
    allowedItems: ladder.allowedItems
  };

  if (Array.isArray(ladder.allowedStages)) {
    result._links.allowedStages = ladder.allowedStages.map( stage => {
      return {
        href: '/games/' + stage.game.key + '/stages/' + stage.key,
        title: stage.name
      };
    });
    result.allowedStages = ladder.allowedStages.map( stage => stage.name ).join(' ,');
  } else {
    result.allowedStages = ladder.allowedStages;
  }

  return result;

}
