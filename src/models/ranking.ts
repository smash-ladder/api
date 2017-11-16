import { Ladder } from '../models/ladder';
import { Player } from '../models/player';
import { Character } from '../models/character';

export interface Ranking {

  ladder: Ladder;
  player: Player;
  rank: number;
  favoriteCharacter: Character;

}
