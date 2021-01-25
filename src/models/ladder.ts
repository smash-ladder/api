import { Stage } from './stage';
import { Game } from './game';

export interface Ladder {

  key: string;
  title: string;
  game: Game;
  allowedStages: Stage[] | string;
  lives: number;
  challengeRankingLimit: number;
  algorithm: string;
  allowedItems: string;

}
