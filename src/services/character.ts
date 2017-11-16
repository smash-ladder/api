import { Game } from '../models/game';
import { GameService } from './game';
import { Character } from '../models/character';
import { NotFoundError } from '../errors';

export class CharacterService {

  getByUri(uri: string): Character {

    const matches = uri.match(/\/games\/([^\/]+)\/characters\/([^\/]+)$/);
    if (!matches) {
      throw new Error('Unkown character uri: ' + uri);
    }

    const gameService = new GameService();

    return this.getByGameAndKey(
      gameService.getByKey(matches[1]),
      matches[2]
    );

  }

  getByGameAndKey(game: Game, key: string): Character {

    const character = this.getByGame(game).find( character =>
      character.key === key
    );

    if (typeof character === 'undefined') {
      throw new NotFoundError('Character not found!');
    }

    return character;

  }

  getByGame(game: Game): Character[] {

    let characters: Character[] = [];
    switch (game.key) {
      case 'ssb64' :
        characters = [
          {
            key: 'kirby',
            name: 'Kirby',
            game: game
          },
          {
            key: 'mario',
            name: 'Mario',
            game: game
          },
          {
            key: 'luigi',
            name: 'Luigi',
            game: game
          },
          {
            key: 'samus',
            name: 'Samus',
            game: game
          },
          {
            key: 'fox',
            name: 'Fox',
            game: game
          },
          {
            key: 'pikachu',
            name: 'Pikachu',
            game: game
          },
          {
            key: 'falcon',
            name: 'Captain Falcon',
            game: game
          },
          {
            key: 'jigglypuff',
            name: 'Jigglypuff',
            game: game
          },
          {
            key: 'ness',
            name: 'Ness',
            game: game
          },
          {
            key: 'donkey-kong',
            name: 'Donkey Kong',
            game: game
          },
          {
            key: 'link',
            name: 'Link',
            game: game
          },
          {
            key: 'yoshi',
            name: 'Yoshi',
            game: game
          },
        ];
        break;
      case 'ssbm' :
        characters = [
          {
            key: 'kirby',
            name: 'Kirby',
            game: game
          },
          {
            key: 'mario',
            name: 'Mario',
            game: game
          },
          {
            key: 'luigi',
            name: 'Luigi',
            game: game
          },
          {
            key: 'samus',
            name: 'Samus',
            game: game
          },
          {
            key: 'fox',
            name: 'Fox',
            game: game
          },
          {
            key: 'pikachu',
            name: 'Pikachu',
            game: game
          },
          {
            key: 'falcon',
            name: 'Captain Falcon',
            game: game
          },
          {
            key: 'jigglypuff',
            name: 'Jigglypuff',
            game: game
          },
          {
            key: 'ness',
            name: 'Ness',
            game: game
          },
          {
            key: 'donkey-kong',
            name: 'Donkey Kong',
            game: game
          },
          {
            key: 'link',
            name: 'Link',
            game: game
          },
          {
            key: 'yoshi',
            name: 'Yoshi',
            game: game
          },
          {
            key: 'peach',
            name: 'Peach',
            game: game
          },
          {
            key: 'bower',
            name: 'Bower',
            game: game
          },
          {
            key: 'drmario',
            name: 'Dr. Mario',
            game: game
          },
          {
            key: 'zelda',
            name: 'Zelda',
            game: game
          },
          {
            key: 'ganondorf',
            name: 'Ganondorf',
            game: game
          },
          {
            key: 'young-link',
            name: 'Young Link',
            game: game
          },
          {
            key: 'falco',
            name: 'Falco',
            game: game
          },
          {
            key: 'mewtwo',
            name: 'Mewtwo',
            game: game
          },
          {
            key: 'pichu',
            name: 'Pichu',
            game: game
          },
          {
            key: 'ice-climbers',
            name: 'Ice Climbers',
            game: game
          },
          {
            key: 'marth',
            name: 'Marth',
            game: game
          },
          {
            key: 'roy',
            name: 'Roy',
            game: game
          },
          {
            key: 'game-and-watch',
            name: 'Mr. Game & Watch',
            game: game
          },
        ];
        break;
    }

    return characters;

  }
}
