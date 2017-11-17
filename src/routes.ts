import { AllowedChallengesCollectionController } from './controllers/allowed-challenges-collection';
import { ChallengeCollectionController } from './controllers/challenge-collection';
import { ChallengeController } from './controllers/challenge';
import { CharacterCollectionController } from './controllers/character-collection';
import { CharacterController } from './controllers/character';
import { GameCollectionController } from './controllers/game-collection';
import { GameController } from './controllers/game';
import { HomeController } from './controllers/home';
import { LadderCollectionController } from './controllers/ladder-collection';
import { LadderController } from './controllers/ladder';
import { MatchCollectionController } from './controllers/match-collection';
import { MatchController } from './controllers/match';
import { PlayerCollectionController } from './controllers/player-collection';
import { PlayerController } from './controllers/player';
import { RankingCollectionController } from './controllers/ranking-collection';
import { RankingController } from './controllers/ranking';
import { StageCollectionController } from './controllers/stage-collection';
import { StageController } from './controllers/stage';
import { BaseController } from './controllers/base';
import { Context } from 'koa';

const Router = require('koa-router');
const router = new Router();

type RouteDefinition = [string, BaseController];

let routes: Array<RouteDefinition>;
routes = [
  [ '/', new HomeController()],
  [ '/ladders', new LadderCollectionController()],
  [ '/ladders/:ladderKey', new LadderController()],
  [ '/ladders/:ladderKey/rankings', new RankingCollectionController()],
  [ '/ladders/:ladderKey/rankings/:userName', new RankingController()],
  [ '/ladders/:ladderKey/rankings/:userName/allowed-challenges', new AllowedChallengesCollectionController()],
  [ '/ladders/:ladderKey/matches', new MatchCollectionController()],
  [ '/ladders/:ladderKey/matches/:matchId', new MatchController()],
  [ '/ladders/:ladderKey/challenges', new ChallengeCollectionController()],
  [ '/ladders/:ladderKey/challenges/:matchId', new ChallengeController()],
  [ '/games', new GameCollectionController()],
  [ '/games/:gameKey', new GameController()],
  [ '/games/:gameKey/characters', new CharacterCollectionController()],
  [ '/games/:gameKey/characters/:characterKey', new CharacterController()],
  [ '/games/:gameKey/stages', new StageCollectionController()],
  [ '/games/:gameKey/stages/:stageKey', new StageController()],
  [ '/players', new PlayerCollectionController()],
  [ '/players/:userName', new PlayerController()]
];

for (const route of routes) {

  const controller: BaseController = route[1];
  router.all(route[0], ( ctx: Context, next: Function ) => {
    return controller.handle(ctx);
  });

}

export default router.routes();
