import { Game } from './game';

export interface Stage {
  key: string;
  name: string;
  game: Game;
}
