import { Player } from './player';
import { Ladder } from './ladder';

export interface Challenge {

  id: number;
  createdAt: Date;

  ladder: Ladder;

  from: Player;
  to: Player;

}
