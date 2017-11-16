import * as Koa from 'koa';
import routes from './routes';
import problem from './middleware/problem';
import browser from './middleware/browser';
import notfound from './middleware/notfound';

const app = new Koa();

app.use((ctx: Koa.Context, next: Function) => {

  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,HEAD');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type,Access');
  ctx.set('Access-Control-Expose-Headers', 'Content-Type');

  if (ctx.method === 'OPTIONS') {
    ctx.status = 204;
    return;
  } else {
    return next();
  }


});
app.use(browser);
app.use(problem);
app.use(routes);
app.use(notfound);

app.listen(3000);
