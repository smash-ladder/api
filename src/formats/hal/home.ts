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
    about: 'Welcome to the Yelp Smash Ladder API!'
  };

}
