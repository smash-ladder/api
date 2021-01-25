export function home() {

  return {
    _links: {
      self: { href: '/' },
      ladderCollection: {
        href: '/ladders',
        title: 'See current and past ladders'
      },
      gameCollection: {
        href: '/games',
        title: 'List of games'
      },
      playerCollection: {
        href: '/players',
        title: 'List of players'
      }
    },
    about: 'Bad Gateway Smash Laddder API',
    version: require('../../../package.json').version
  };

}
