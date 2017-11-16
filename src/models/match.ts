import { Player } from './player';
import { Ladder } from './ladder';
import { Stage } from './stage';
import { Character } from './character';

export interface Match {

  id: number;
  created: Date;

  ladder: Ladder;

  winner: Player;
  loser: Player;

  winnerCharacter: Character;
  loserCharacter: Character;
  stage: Stage;

  livesLeft: number;

}
