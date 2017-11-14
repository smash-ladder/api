import * as Koa from 'koa';
import routes from './routes';
import problem from './middleware/problem';

const app = new Koa();

app.use(problem);
app.use(routes);

app.listen(3000);
