import * as Koa from 'koa';
import routes from './routes';
import problem from './middleware/problem';
import browser from './middleware/browser';
import notfound from './middleware/notfound';

const app = new Koa();

app.use(browser);
app.use(problem);
app.use(routes);
app.use(notfound);

app.listen(3000);
