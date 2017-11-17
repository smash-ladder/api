import { Player } from './player';
import { Ladder } from './ladder';

export interface Challenge {

  id: number;
  created: Date;

  ladder: Ladder;

  from: Player;
  to: Player;

}
