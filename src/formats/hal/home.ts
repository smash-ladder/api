export function home() {

  return {
    _links: {
      self: { href: '/' },
      ladderCollection: {
        href: '/ladders',
        title: 'See current and past ladders'
      }
    },
    about: 'Welcome to the Yelp Smash Ladder API!'
  };

}
