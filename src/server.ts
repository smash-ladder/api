import * as Koa from 'koa';

const app = new Koa();

app.use( (ctx: Koa.Context) => {

  ctx.body = 'Hello world';

});

app.listen(3000);
