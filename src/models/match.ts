import { Player } from './player';
import { Ladder } from './ladder';

export interface Match {

  id: number;
  created: Date;

  ladder: Ladder;

  winner: Player;
  loser: Player;

  livesLeft: number;

}
