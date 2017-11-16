import { Stage } from './stage';
import { Game } from './game';

export interface Ladder {

  key: string;
  title: string;
  game: Game;
  allowedStages: Stage[];
  lives: number;
  challengeRankingLimit: number;
  algorithm: string;

}
