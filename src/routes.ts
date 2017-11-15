import { HomeController } from './controllers/home';
import { LadderCollectionController } from './controllers/ladder-collection';
import { LadderController } from './controllers/ladder';
import { GameCollectionController } from './controllers/game-collection';
import { GameController } from './controllers/game';
import { PlayerCollectionController } from './controllers/player-collection';
import { PlayerController } from './controllers/player';
import { RankingCollectionController } from './controllers/ranking-collection';
import { RankingController } from './controllers/ranking';
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
  [ '/games', new GameCollectionController()],
  [ '/games/:key', new GameController()],
  [ '/players', new PlayerCollectionController()],
  [ '/players/:userName', new PlayerController()]
];

for (const route of routes) {

  const controller: BaseController = route[1];
  router.get(route[0], ( ctx: Context, next: Function ) => {
    return controller.handle(ctx);
  });

}

export default router.routes();
