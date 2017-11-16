import { Ladder } from '../models/ladder';
import { Player } from '../models/player';

export interface Ranking {

  ladder: Ladder;
  player: Player;
  rank: number;

}
