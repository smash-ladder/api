import { HomeController } from './controllers/home';
import { BaseController } from './controllers/base';
import { Context } from 'koa';

const Router = require('koa-router');
const router = new Router();

type RouteDefinition = [string, BaseController];

let routes: Array<RouteDefinition>;
routes = [
  [ '/', new HomeController()]
];

for(let route of routes) {
  
  let controller:BaseController = route[1];
  router.get(route[0], ( ctx: Context, next: Function ) => {
    return controller.handle(ctx);
  }); 

}

export default router.routes();
